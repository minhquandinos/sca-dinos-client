import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { pluck } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { DynamicComponentLookup } from '@scaleo/core/decorators/common';
import { BaseDashboardWidgetComponent, DASHBOARD_WIDGET } from '@scaleo/dashboard/common';
import { DashboardConfigService, DashboardWidgetService } from '@scaleo/dashboard/service';
import {
    AFFILIATE_PENDING_RECORDS_COUNT_PROVIDER,
    AffiliateDashboardPendingRecordsCountService
} from '@scaleo/feature/affiliate/dashboard/widgets/pending-records/data-access';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@DynamicComponentLookup(DASHBOARD_WIDGET.pendingRecordsAffiliate)
@Component({
    selector: 'scaleo-affiliate-dashboard-pending-record-widget',
    templateUrl: './affiliate-dashboard-pending-record-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AFFILIATE_PENDING_RECORDS_COUNT_PROVIDER]
})
export class AffiliateDashboardPendingRecordWidgetComponent extends BaseDashboardWidgetComponent implements OnInit, AfterViewInit {
    // TODO for now this functional is disabled
    // readonly countsAffiliatePostback$ = this.countService.counts$.pipe(pluck('postbacks-count'));

    readonly countsOfferRequest$ = this.countService.counts$.pipe(pluck('requested-count'));

    constructor(
        protected dashboardConfigService: DashboardConfigService,
        protected dashboardWidgetService: DashboardWidgetService,
        private readonly countService: AffiliateDashboardPendingRecordsCountService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        super(dashboardConfigService, dashboardWidgetService, null);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.countService.getCounts().pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    ngAfterViewInit(): void {
        this.createWidgetAction()
            .pipe(
                tap((action) => {
                    this.dashboardWidgetService.activeInactiveWidget(action, this.widget);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();

        this.setContainerWidgetFooterBorderTop();
    }
}
