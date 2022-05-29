import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { debounceTime, filter, map, pluck, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { ReportEnum, StatisticModel } from '@scaleo/reports/common';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { animationRules } from '@scaleo/shared/animations';
import { UiTable2Component, UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { NewReportStatisticsLayoutComponent } from '../../containers/new-report-statistics-layout/new-report-statistics-layout.component';
import { NewReportStatisticsTableService } from '../../services/new-report-statistics-table.service';
import {
    NewReportStatisticsBreakdownService,
    NewReportStatisticsColumnsService,
    NewReportStatisticsQuery,
    NewReportStatisticsService
} from '../../state';
import { NewReportStatisticsSortService } from '../../state/new-report-statistics-sort.service';
import { ReportStatisticsTableTotalsComponent } from '../report-statistics-table-totals/report-statistics-table-totals.component';

@Component({
    selector: 'app-new-report-statistics',
    templateUrl: './new-report-statistics.component.html',
    animations: [animationRules.fade()],
    styleUrls: ['./new-report-statistics.component.scss'],
    providers: [UnsubscribeService]
})
export class NewReportStatisticsComponent implements OnInit, OnDestroy, AfterViewInit {
    readonly reportType = ReportEnum.Statistics;

    statistics$: Observable<StatisticModel[]> = this.statisticsService.statistics$;

    columnsTree$ = this.statisticsQuery.tableColumnsTree$;

    breakdownColumnsTree$ = this.breakdownService.breakdownColumnsTree$;

    breakdown$: Observable<BreakdownEnum> = this.breakdownService.first$.pipe(pluck('breakdown'));

    sortField$ = this.sortService.sortField$;

    loading$ = this.statisticsService.loading$;

    isLoad: boolean;

    countItems$ = this.statisticsQuery.countItems$;

    totals$ = this.statisticsQuery.totals$;

    readonly currency$ = this.statisticsQuery.currency$;

    readonly rootFilters$ = this.statisticsQuery.filterData$;

    @ViewChild(UiTable2Component)
    private set _table2Component(component: UiTable2Component) {
        if (component && !this.table2Component) {
            this.table2Component = component;
        }
    }

    table2Component: UiTable2Component;

    @ViewChild(ReportStatisticsTableTotalsComponent, { static: true })
    set reportStatisticsTableTotals(ref: ReportStatisticsTableTotalsComponent) {
        if (ref) {
            this.reportStatisticsTableTotalsRef = ref;
        }
    }

    private reportStatisticsTableTotalsRef: ReportStatisticsTableTotalsComponent;

    readonly currentPath: string;

    readonly parentComponent: NewReportStatisticsLayoutComponent;

    readonly showTotals$ = combineLatest([this.totals$, this.countItems$, this.breakdown$]).pipe(
        map(
            ([totals, countItems, firstBreakdown]) =>
                totals && countItems > 1 && ![BreakdownEnum.AffiliateManager, BreakdownEnum.AdvertiserManager].includes(firstBreakdown)
        )
    );

    constructor(
        private route: ActivatedRoute,
        protected profileQuery: ProfileQuery,
        private statisticsService: NewReportStatisticsService,
        private breakdownService: NewReportStatisticsBreakdownService,
        private statisticsQuery: NewReportStatisticsQuery,
        private columnsService: NewReportStatisticsColumnsService,
        private sortService: NewReportStatisticsSortService,
        private translate: TranslateService,
        private statisticsTableService: NewReportStatisticsTableService,
        @Inject(forwardRef(() => NewReportStatisticsLayoutComponent)) parentComponent: NewReportStatisticsLayoutComponent,
        private readonly unsubscribe: UnsubscribeService,
        private readonly cdr: ChangeDetectorRef
    ) {
        this.currentPath = this.route.snapshot.routeConfig.path;
        this.parentComponent = parentComponent;
    }

    ngOnInit() {
        this.statisticsService.initSupportQueryParams().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        this.initReport();
    }

    ngOnDestroy(): void {
        this.parentComponent.reportDateRangeComponent.setPreviousPageDate(this.currentPath as BreakdownEnum);
    }

    private initReport(): void {
        combineLatest([this.statisticsQuery.prepareFilter$(), this.parentComponent.restart$.pipe(startWith(false))])
            .pipe(
                tap(([flt]) => {
                    if (flt.payload.columns && !flt?.params?.sortField) {
                        this.autoSetSortField();
                    }
                }),
                filter(([flt]) => !!flt?.params?.sortField),
                debounceTime(300),
                switchMap(([filters]) => {
                    if (filters?.payload?.columns && filters?.params?.sortField) {
                        return this.statisticsService.getParent(filters).pipe(
                            tap(() => {
                                if (!this.isLoad) {
                                    this.isLoad = true;
                                    this.cdr.markForCheck();
                                }
                            })
                        );
                    }
                    return EMPTY;
                }),
                tap(() => {
                    this.parentComponent.reportLastUpdatedComponent?.updated();
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();

        this.statisticsTableService.update$.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            this.table2Component.updateScrollWidth();
        });
    }

    private autoSetSortField(): void {
        this.sortService.initSortField(this.currentPath as BreakdownEnum);
    }

    trackByFn(index: number): number {
        return index;
    }

    trackBySkeletonFn(index: number): number {
        return index;
    }

    sortWasChanged(sort: UiTable2SortColumnModel): void {
        this.statisticsService.resetStoreEntities();
        this.statisticsService.setLoading(true);
        this.statisticsService.updateSort(sort);
    }
}
