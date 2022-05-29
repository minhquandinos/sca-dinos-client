import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportEnum, ReportPagesEnum } from '@scaleo/reports/common';
import { REPORTS_LAYOUT, ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';
import { ReportsService } from '@scaleo/reports/state';
import { BaseTransactionReportComponent } from '@scaleo/reports/transactions/common';
import {
    REPORT_INVALID_CLICK_LIST_PROVIDER,
    ReportInvalidClicksQuery,
    ReportInvalidClicksService
} from '@scaleo/reports/transactions/logs/invalid-click/data-access';
import { animationRules } from '@scaleo/shared/animations';

@Component({
    selector: 'scaleo-report-invalid-click-list',
    templateUrl: './report-invalid-clicks.component.html',
    styleUrls: ['./report-invalid-clicks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [animationRules.fade()],
    providers: [{ provide: REPORTS_LAYOUT, useExisting: ReportsLayoutComponent }, UnsubscribeService, REPORT_INVALID_CLICK_LIST_PROVIDER],
    encapsulation: ViewEncapsulation.None
})
export class ReportInvalidClicksComponent extends BaseTransactionReportComponent implements OnInit, AfterViewInit, OnDestroy {
    readonly reportType = ReportEnum.Logs;

    readonly pageType = ReportPagesEnum.InvalidClicks;

    // readonly newItems$ = this.invalidClicksQuery.selectAll();
    //
    // readonly loading$ = this.invalidClicksQuery.select('loading');
    //
    // readonly columns$ = this.invalidClicksQuery.columns$;
    //
    // readonly sortField$: Observable<string> = this.invalidClicksQuery.sort$.pipe(pluck('field'));
    //
    // readonly sortDirection$: Observable<UiTable2ColumnDirectionType> = this.invalidClicksQuery.sort$.pipe(pluck('direction'));
    //
    // readonly pagination$: Observable<ApiPaginationModel> = this.invalidClicksQuery.select((state) => state.data.pagination);
    //
    // readonly totalCount$: Observable<number> = this.pagination$.pipe(pluck('total_count'));
    //
    // readonly columnsOptions$: Observable<ConfigTableColumn2Model[]> = this.invalidClicksService.getColumnsOptions();

    // @ViewChild(ConfigTableColumn2Component, { static: true })
    // private configTableColumn2Component: ConfigTableColumn2Component;

    constructor(
        private activatedRoute: ActivatedRoute,
        private invalidClicksService: ReportInvalidClicksService,
        private invalidClicksQuery: ReportInvalidClicksQuery,
        private reportsService: ReportsService,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(REPORTS_LAYOUT) private reportsLayout: ReportsLayoutComponent,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(invalidClicksService, invalidClicksQuery);
    }

    ngOnInit(): void {
        this.invalidClicksService.initSupportQueryParams().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.reportsLayout.createHeader(this.layoutHeaderTpl);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        // this.invalidClicksService.resetStore();
        this.reportsService.manualResetHandler();
    }

    exportData(format: SheetExtensionType): void {
        const exportDataRequest$ = this.invalidClicksService.exportData(format);

        this.exportDataToFile(exportDataRequest$);
    }

    // private initItems(): void {
    //     combineLatest([this.invalidClicksQuery.prepareParams$, this.restart$])
    //         .pipe(
    //             debounceTime(300),
    //             filter(([flt]) => !!flt.payload.columns),
    //             switchMap(([flt]) => this.invalidClicksService.get(flt)),
    //             tap(() => {
    //                 this.updateRefreshTimer();
    //             }),
    //             takeUntil(this.unsubscribe)
    //         )
    //         .subscribe();
    // }
}
