import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostBinding, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportEnum } from '@scaleo/reports/common';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { REPORTS_LAYOUT, ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';
import { ReportsService } from '@scaleo/reports/state';
import { reportClicksActions, ReportClicksQuery, ReportClicksService } from '@scaleo/reports/transactions/click/data-access';
import { BaseTransactionReportComponent } from '@scaleo/reports/transactions/common';
import { animationRules } from '@scaleo/shared/animations';

@Component({
    selector: 'scaleo-report-click-list',
    templateUrl: './report-clicks.component.html',
    styleUrls: ['./report-clicks.component.scss'],
    animations: [animationRules.fade()],
    providers: [
        {
            provide: REPORTS_LAYOUT,
            useExisting: ReportsLayoutComponent
        },
        UnsubscribeService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ReportClicksComponent extends BaseTransactionReportComponent implements OnInit, OnDestroy, AfterViewInit {
    @HostBinding('class') hostClass = 'report-clicks';

    reportType = ReportEnum.Clicks;

    constructor(
        private translate: TranslateService,
        @Inject(DOCUMENT) public document: Document,
        private clicksService: ReportClicksService,
        private clicksQuery: ReportClicksQuery,
        private route: ActivatedRoute,
        private router: Router,
        private reportsService: ReportsService,
        @Inject(REPORTS_LAYOUT) private reportsLayout: ReportsLayoutComponent,
        private actions: Actions,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(clicksService, clicksQuery);
    }

    ngOnInit() {
        // this.clicksService.initDonorFilters();
        this.clicksService.initSupportQueryParams().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.reportsLayout.createHeader(this.layoutHeaderTpl);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.clicksService.resetStore();
        this.reportsService.manualResetHandler();
    }

    exportData(format: SheetExtensionType): void {
        this.exportDataToFile(this.clicksService.exportData(format));
    }

    trafficLogsLink(): void {
        this.router.navigate(['../invalid-clicks'], { relativeTo: this.route });
    }

    changedFilters(filters: ReportFilterModel[]): void {
        super.changedFilters(filters);
        this.actions.dispatch(reportClicksActions.selectedFilters());
    }

    columnWasChanged(columns: string[]) {
        super.columnWasChanged(columns);
        this.actions.dispatch(reportClicksActions.updatedColumns());
    }
}
