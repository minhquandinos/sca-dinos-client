import { AfterViewInit, Component, HostBinding, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { SheetExtensionType } from '@scaleo/platform/data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { REPORT_DEFAULT_FILTERS_TOKEN, ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { REPORTS_LAYOUT, ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';
import { ReportsService } from '@scaleo/reports/state';
import { BaseTransactionReportComponent, TRANSACTION_REPORT_STORE_CONFIG_TOKEN } from '@scaleo/reports/transactions/common';
import {
    REPORT_CONVERSIONS_PROVIDER,
    ReportConversionsQuery,
    ReportConversionsService
} from '@scaleo/reports/transactions/conversion/data-access';
import { TransactionReportListComponent } from '@scaleo/reports/transactions/shared/components/transaction-list';
import { animationRules } from '@scaleo/shared/animations';

@Component({
    selector: 'app-report-conversions',
    templateUrl: './advertiser-report-conversions.component.html',
    animations: [animationRules.fade()],
    providers: [
        {
            provide: REPORTS_LAYOUT,
            useExisting: ReportsLayoutComponent
        },
        UnsubscribeService,
        {
            provide: TRANSACTION_REPORT_STORE_CONFIG_TOKEN,
            useValue: {
                name: 'advertiser-report-conversions'
            }
        },
        {
            provide: REPORT_DEFAULT_FILTERS_TOKEN,
            useValue: [ReportFilterFilterEnum.Offer]
        },
        REPORT_CONVERSIONS_PROVIDER
    ]
})
export class AdvertiserReportConversionsComponent extends BaseTransactionReportComponent implements OnInit, OnDestroy, AfterViewInit {
    @HostBinding('class') hostClass = 'report-conversions';

    @ViewChild(TransactionReportListComponent)
    private readonly _mainTableComponent: TransactionReportListComponent;

    selectedItems: string[] = [];

    constructor(
        protected conversionsService: ReportConversionsService,
        private conversionsQuery: ReportConversionsQuery,
        private route: ActivatedRoute,
        private router: Router,
        private reportsService: ReportsService,
        private readonly unsubscribe: UnsubscribeService,
        @Inject(REPORTS_LAYOUT) private reportsLayout: ReportsLayoutComponent,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(conversionsService, conversionsQuery);
    }

    ngOnInit() {
        this.conversionsService.initSupportQueryParams().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.reportsLayout.createHeader(this.layoutHeaderTpl);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.conversionsService.resetStore();
        this.reportsService.manualResetHandler();
    }

    exportData(format: SheetExtensionType): void {
        const exportDataRequest$ = this.conversionsService.exportData(format, this.selectedItems).pipe(
            tap(() => {
                this.clearSelected();
            })
        );

        this.exportDataToFile(exportDataRequest$);
    }

    clearSelected(): void {
        this._mainTableComponent.clearSelected();
    }

    trafficLogsLink(): void {
        this.router.navigate(['../advertiser-postbacks'], { relativeTo: this.route });
    }

    selectItems(items: string[]): void {
        this.selectedItems = items;
    }
}
