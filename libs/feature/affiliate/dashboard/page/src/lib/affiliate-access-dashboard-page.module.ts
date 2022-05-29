import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DASHBOARD_CONFIG_PROVIDER } from '@scaleo/dashboard/data-access';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { DashboardGridModule } from '@scaleo/dashboard/shared/components/grid/component';
import { DashboardSkeletonModule } from '@scaleo/dashboard/shared/components/skeleton';
import { NetworkSummaryWidgetModule } from '@scaleo/dashboard/shared/widgets/network-summary/component';
import { PerformanceWidgetModule } from '@scaleo/dashboard/shared/widgets/performance/component';
import { TopOfferWidgetModule } from '@scaleo/dashboard/shared/widgets/top/components/offer/widget';
import { AffiliateDashboardAnnouncementsWidgetModule } from '@scaleo/feature/affiliate/dashboard/widgets/announcements/widget';
import { AffiliateDashboardPendingRecordWidgetModule } from '@scaleo/feature/affiliate/dashboard/widgets/pending-records/component';
import { BalanceWidgetModule } from '@scaleo/feature-affiliate-dashboard-widgets-balance-component';
import { OfferPromoteWidgetModule } from '@scaleo/feature-affiliate-dashboard-widgets-offer-promote-component';

import { AffiliateAccessDashboardPageComponent } from './affiliate-access-dashboard-page.component';

@NgModule({
    declarations: [AffiliateAccessDashboardPageComponent],
    imports: [
        CommonModule,
        DashboardGridModule,
        PerformanceWidgetModule,
        NetworkSummaryWidgetModule,
        TopOfferWidgetModule,
        BalanceWidgetModule,
        OfferPromoteWidgetModule,
        // MgcomTopModule,
        AffiliateDashboardPendingRecordWidgetModule,
        AffiliateDashboardAnnouncementsWidgetModule,
        DashboardSkeletonModule,
        RouterModule.forChild([
            {
                path: '',
                data: {
                    header: 'main_navigation.dashboard'
                },
                component: AffiliateAccessDashboardPageComponent
            }
        ])
    ],
    providers: [DashboardConfigService, DashboardWidgetService, DashboardToolbarService, DASHBOARD_CONFIG_PROVIDER]
    // providers: [
    //     {
    //         provide: GRID_CONFIG_TOKEN,
    //         useFactory: (platformSettingsQuery: PlatformSettingsQuery) => {
    //             const widgets = new AffiliateWidgetTransform(affiliateDashboardWidgetsConfig, platformSettingsQuery.settings);
    //
    //             return widgets.transform();
    //         },
    //         deps: [PlatformSettingsQuery]
    //     }
    // ]
})
export class AffiliateAccessDashboardPageModule {}
