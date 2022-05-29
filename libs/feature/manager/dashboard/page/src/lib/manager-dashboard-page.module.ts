import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DASHBOARD_CONFIG_PROVIDER } from '@scaleo/dashboard/data-access';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { DashboardGridModule } from '@scaleo/dashboard/shared/components/grid/component';
import { DashboardSkeletonModule } from '@scaleo/dashboard/shared/components/skeleton';
import { MgcomTopModule } from '@scaleo/dashboard/shared/widgets/mgcom-top/component';
import { NetworkSummaryWidgetModule } from '@scaleo/dashboard/shared/widgets/network-summary/component';
import { NotificationsWidgetModule } from '@scaleo/dashboard/shared/widgets/notification/component';
import { PerformanceWidgetModule } from '@scaleo/dashboard/shared/widgets/performance/component';
import { ShortcutsWidgetModule } from '@scaleo/dashboard/shared/widgets/shortcut/component';
import { TopOfferWidgetModule } from '@scaleo/dashboard/shared/widgets/top/components/offer/widget';
import { ManagerDashboardPendingRecordWidgetModule } from '@scaleo/feature/manager/dashboard/widgets/pending-records/component';
import { TopAffiliateWidgetModule } from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/widget';

import { ManagerDashboardPageComponent } from './manager-dashboard-page.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardGridModule,
        PerformanceWidgetModule,
        NetworkSummaryWidgetModule,
        TopOfferWidgetModule,
        TopAffiliateWidgetModule,
        NotificationsWidgetModule,
        ManagerDashboardPendingRecordWidgetModule,
        MgcomTopModule,
        ShortcutsWidgetModule,
        DashboardSkeletonModule,
        RouterModule.forChild([
            {
                path: '',
                data: {
                    header: 'main_navigation.dashboard'
                },
                component: ManagerDashboardPageComponent
            }
        ])
    ],
    declarations: [ManagerDashboardPageComponent],
    providers: [DashboardConfigService, DashboardWidgetService, DashboardToolbarService, DASHBOARD_CONFIG_PROVIDER]
})
export class ManagerDashboardPageModule {}
