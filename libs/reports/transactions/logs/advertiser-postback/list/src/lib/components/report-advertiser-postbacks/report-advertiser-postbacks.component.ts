import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportEnum, ReportPagesEnum } from '@scaleo/reports/common';
import { REPORTS_LAYOUT, ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';
import { BaseTransactionReportComponent } from '@scaleo/reports/transactions/common';
import {
    REPORT_ADVERTISER_POSTBACK_LIST_PROVIDER,
    ReportAdvertiserPostbacksQuery,
    ReportAdvertiserPostbacksService
} from '@scaleo/reports/transactions/logs/advertiser-postback/data-access';
import { animationRules } from '@scaleo/shared/animations';

@Component({
    selector: 'scaleo-report-advertiser-postbacks',
    templateUrl: './report-advertiser-postbacks.component.html',
    animations: [animationRules.fade()],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: REPORTS_LAYOUT, useExisting: ReportsLayoutComponent },
        REPORT_ADVERTISER_POSTBACK_LIST_PROVIDER,
        UnsubscribeService
    ]
})
export class ReportAdvertiserPostbacksComponent extends BaseTransactionReportComponent implements OnInit, OnDestroy, AfterViewInit {
    readonly reportType = ReportEnum.Logs;

    readonly pageType = ReportPagesEnum.AdvertiserPostbacks;

    constructor(
        private activatedRoute: ActivatedRoute,
        private advertiserPostbacksService: ReportAdvertiserPostbacksService,
        private advertiserPostbacksQuery: ReportAdvertiserPostbacksQuery,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(REPORTS_LAYOUT) private reportsLayout: ReportsLayoutComponent,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(advertiserPostbacksService, advertiserPostbacksQuery);
    }

    ngOnInit(): void {
        this.advertiserPostbacksService.initSupportQueryParams().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.reportsLayout.createHeader(this.layoutHeaderTpl);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.advertiserPostbacksService.resetStore();
    }

    exportData(format: SheetExtensionType): void {
        const exportDataRequest$ = this.advertiserPostbacksService.exportData(format);

        this.exportDataToFile(exportDataRequest$);
    }
}
