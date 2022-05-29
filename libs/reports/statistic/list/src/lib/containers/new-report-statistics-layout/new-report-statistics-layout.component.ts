import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Inject,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, filter, pairwise, share, takeUntil, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { SheetExtensionType } from '@scaleo/platform/data';
import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BaseReportComponent, ReportPagesEnum } from '@scaleo/reports/common';
import { ReportDateRangeComponent } from '@scaleo/reports/shared/components/date-range';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { REPORTS_LAYOUT, ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';
import { ReportsService } from '@scaleo/reports/state';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { ConfigTableColumnComponent, StatisticOutputParameterInterface } from '@scaleo/shared/components';
import { UiTable2ColumnsModel } from '@scaleo/ui-kit/elements';

import {
    NewReportStatisticsBreakdownService,
    NewReportStatisticsColumnsService,
    NewReportStatisticsQuery,
    NewReportStatisticsService
} from '../../state';
import { newReportStatisticsActions } from '../../state/new-report-statistics.actions';

@Component({
    selector: 'app-new-report-statistics-layout',
    templateUrl: './new-report-statistics-layout.component.html',
    styleUrls: ['./new-report-statistics-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: REPORTS_LAYOUT,
            useExisting: ReportsLayoutComponent
        },
        UnsubscribeService
    ],
    encapsulation: ViewEncapsulation.None
})
export class NewReportStatisticsLayoutComponent
    extends BaseReportComponent<NewReportStatisticsService>
    implements OnInit, AfterViewInit, OnDestroy
{
    // TODO create component and loading global service for rest api
    loading: boolean;

    loading$ = this.statisticsService.loading$;

    countItems$ = this.statisticsQuery.countItems$;

    readonly currency$ = this.statisticsQuery.currency$;

    showTimeZone = false;

    configTableParameters$: Observable<StatisticOutputParameterInterface[]> = this.statisticsService.configTableParameters();

    @ViewChild(ReportDateRangeComponent)
    set reportDateRangeComponent(value: ReportDateRangeComponent) {
        if (value && !this._reportDateRangeComponent) {
            this._reportDateRangeComponent = value;
            this.autoSetDatePreset(this.currentPath.value as BreakdownEnum);
        }
    }

    get reportDateRangeComponent(): ReportDateRangeComponent {
        return this._reportDateRangeComponent;
    }

    private _reportDateRangeComponent: ReportDateRangeComponent;

    @ViewChild('configTableColumnComponent', { static: true })
    configTableColumnComponent: ConfigTableColumnComponent;

    @ViewChild('layoutHeaderTpl', { static: true })
    layoutHeaderTpl: TemplateRef<any>;

    pageType: ReportPagesEnum = ReportPagesEnum.Statistics;

    private currentPath: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    @HostBinding('class') hostClass = 'new-report-statistics-layout';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private statisticsQuery: NewReportStatisticsQuery,
        private statisticsService: NewReportStatisticsService,
        protected profileQuery: ProfileQuery,
        private breakdownService: NewReportStatisticsBreakdownService,
        private columnsService: NewReportStatisticsColumnsService,
        private readonly reportsService: ReportsService,
        @Inject(REPORTS_LAYOUT) private reportsLayout: ReportsLayoutComponent,
        private readonly unsubscribe: UnsubscribeService,
        private readonly actions: Actions,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(statisticsService);
    }

    ngOnInit(): void {
        this.initColumns();
    }

    ngAfterViewInit(): void {
        this.reportsLayout.createHeader(this.layoutHeaderTpl);

        this.breakdownService.first$
            .pipe(
                pairwise(),
                debounceTime(300),
                tap(([previous, current]) => {
                    const currentBreakdown = current?.breakdown;
                    const previousBreakdown = previous?.breakdown;
                    if (currentBreakdown !== previousBreakdown) {
                        switch (true) {
                            case currentBreakdown === BreakdownEnum.Hour && this.statisticsQuery.filterBreakdown === BreakdownEnum.Hour:
                                this.dateRangeForHourBreakdown();
                                break;
                            case currentBreakdown === BreakdownEnum.Hour &&
                                this.breakdownService.previousFrom(currentBreakdown, BreakdownEnum.Day) !== BreakdownEnum.Day:
                                this.dateRangeForHourBreakdown();
                                break;
                            case this.breakdownService.first?.breakdown === BreakdownEnum.Hour:
                                this.dateRangeForHourBreakdown();
                                break;
                            case currentBreakdown === BreakdownEnum.Month || currentBreakdown === BreakdownEnum.Year:
                                this.reportDateRangeComponent?.switchPreset(CustomDateRangeTitleEnum.ThisYear);
                                break;
                            case previousBreakdown === BreakdownEnum.Hour:
                            case previousBreakdown === undefined:
                                this.defaultDateRange();
                                break;
                            default:
                                break;
                        }
                    }

                    if (currentBreakdown === undefined && previousBreakdown === undefined) {
                        this.defaultDateRange();
                    }

                    if (!currentBreakdown && previousBreakdown) {
                        const [first] = this.route.snapshot.children;
                        const { path } = first.routeConfig;

                        if (path !== 'general') {
                            this.router.navigate(['general'], { relativeTo: this.route });
                        }
                    }
                }),
                share(),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    onScroll(): void {
        if (this.statisticsQuery.pagination && this.statisticsQuery.pagination.current_page < this.statisticsQuery.pagination.page_count) {
            this.statisticsService.updateFilterPage(this.statisticsQuery.pagination.current_page + 1);
        }
    }

    updated(): void {
        this.statisticsService.resetStoreEntities();
        this.statisticsService.setLoading(true);
        this.statisticsService.updateFilterPage(1);
        this.statisticsService.clearTotals();
    }

    private autoSetDatePreset(breakdown: BreakdownEnum): void {
        if (breakdown === BreakdownEnum.Month || breakdown === BreakdownEnum.Year) {
            this.reportDateRangeComponent?.switchPreset(CustomDateRangeTitleEnum.ThisYear);
        }
    }

    private dateRangeForHourBreakdown(): void {
        // this.showTimeZone = false;
        this.reportDateRangeComponent.switchSingle(true);
        this.reportDateRangeComponent.switchPreset(CustomDateRangeTitleEnum.Today);
    }

    private defaultDateRange(): void {
        if (!this.reportDateRangeComponent?.isCustomDate) {
            this.resetDateRange();
        }
    }

    private resetDateRange(): void {
        // this.showTimeZone = true;
        this.reportDateRangeComponent.switchSingle(false);
        this.reportDateRangeComponent.switchPreset();
    }

    exportData(format: SheetExtensionType): void {
        this.exportDataToFile(this.statisticsService.exportData(format));
    }

    initColumns(): void {
        this.configTableColumnComponent.columnsTree$
            .pipe(
                filter((columns) => columns?.length > 0),
                tap((columns) => {
                    this.columnsService.updateStatisticTableColumnsTree(columns as UiTable2ColumnsModel[]);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.actions.dispatch(newReportStatisticsActions.updatedColumns());
            });
    }

    private autoSetBreakdown(currentPath: BreakdownEnum): void {
        this.breakdownService.initBreakdown(currentPath, this.route.snapshot.queryParams);
    }

    onActivate(componentRef: any): void {
        this.statisticsService.resetStore();
        this.statisticsService.setLoading(true);

        const currentPath = componentRef.currentPath as BreakdownEnum;
        this.currentPath.next(currentPath);
        this.autoSetBreakdown(this.currentPath.value as BreakdownEnum);
    }

    updateCurrency(currency: CurrencyEnum): void {
        this.updated();
        this.service.updateCurrency(currency);
    }

    changedFilters(filters: ReportFilterModel[]): void {
        super.changedFilters(filters);
        // this.actions.dispatch(newReportStatisticsActions.selectedFilters());
    }
}
