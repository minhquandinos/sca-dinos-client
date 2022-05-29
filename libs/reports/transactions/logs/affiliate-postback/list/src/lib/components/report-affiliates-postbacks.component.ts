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
    REPORT_AFFILIATE_POSTBACK_LIST_PROVIDER,
    ReportAffiliatesPostbacksQuery,
    ReportAffiliatesPostbacksService
} from '@scaleo/reports/transactions/logs/affiliate-postback/data-access';
import { animationRules } from '@scaleo/shared/animations';

@Component({
    selector: 'scaleo-report-affiliates-postbacks',
    templateUrl: './report-affiliates-postbacks.component.html',
    animations: [animationRules.fade()],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: REPORTS_LAYOUT, useExisting: ReportsLayoutComponent },
        UnsubscribeService,
        REPORT_AFFILIATE_POSTBACK_LIST_PROVIDER
    ]
})
export class ReportAffiliatesPostbacksComponent extends BaseTransactionReportComponent implements OnInit, OnDestroy, AfterViewInit {
    public readonly reportType = ReportEnum.Logs;

    readonly pageType = ReportPagesEnum.AffiliatesPostbacks;

    constructor(
        private activatedRoute: ActivatedRoute,
        private affiliatesPostbacksService: ReportAffiliatesPostbacksService,
        private affiliatesPostbacksQuery: ReportAffiliatesPostbacksQuery,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(REPORTS_LAYOUT) private reportsLayout: ReportsLayoutComponent,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(affiliatesPostbacksService, affiliatesPostbacksQuery);
    }

    ngOnInit(): void {
        this.affiliatesPostbacksService.initSupportQueryParams().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.reportsLayout.createHeader(this.layoutHeaderTpl);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.affiliatesPostbacksService.resetStore();
    }

    exportData(format: SheetExtensionType): void {
        const exportDataRequest$ = this.affiliatesPostbacksService.exportData(format);

        this.exportDataToFile(exportDataRequest$);
    }
}
