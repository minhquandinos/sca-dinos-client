import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { DASHBOARD_CONFIG_PROVIDER } from '@scaleo/dashboard/data-access';
import { DashboardConfigService, DashboardToolbarService, DashboardWidgetService } from '@scaleo/dashboard/service';
import { DashboardGridModule } from '@scaleo/dashboard/shared/components/grid/component';
import { DashboardSkeletonModule } from '@scaleo/dashboard/shared/components/skeleton';
import { NetworkSummaryWidgetModule } from '@scaleo/dashboard/shared/widgets/network-summary/component';
import { NotificationsWidgetModule } from '@scaleo/dashboard/shared/widgets/notification/component';
import { TopOfferWidgetModule } from '@scaleo/dashboard/shared/widgets/top/components/offer/widget';

import { AdvertiserAccessDashboardComponent } from './advertiser-access-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: AdvertiserAccessDashboardComponent,
        data: {
            header: 'main_navigation.dashboard'
        }
    }
];

@NgModule({
    declarations: [AdvertiserAccessDashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DashboardSkeletonModule,
        DashboardGridModule,
        NetworkSummaryWidgetModule,
        TopOfferWidgetModule,
        NotificationsWidgetModule,
        SharedModule
    ],
    exports: [AdvertiserAccessDashboardComponent],
    providers: [DashboardConfigService, DashboardWidgetService, DashboardToolbarService, DASHBOARD_CONFIG_PROVIDER]
})
export class AdvertiserAccessDashboardModule {}
