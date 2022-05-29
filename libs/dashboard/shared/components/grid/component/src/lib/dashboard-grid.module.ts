import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';

import { SharedModule } from '@scaleo/core/shared/module';
import { DASHBOARD_COMPONENT_REF_TOKEN, DashboardWidgetModel, GRID_CONFIG_TOKEN } from '@scaleo/dashboard/common';
import { DynamicWidgetModule } from '@scaleo/dashboard/shared/components/dynamic-widget';
import { DashboardToolbarModule } from '@scaleo/dashboard/shared/components/toolbar';

// import { BalanceWidgetModule } from '@scaleo/dashboard/shared/widgets/balance/component';
// import { MgcomTopModule } from '@scaleo/dashboard/shared/widgets/mgcom-top/component';
// import { NetworkSummaryWidgetModule } from '@scaleo/dashboard/shared/widgets/network-summary/component';
// import { NotificationsWidgetModule } from '@scaleo/dashboard/shared/widgets/notification/component';
// import { OfferPromoteWidgetModule } from '@scaleo/dashboard/shared/widgets/offer-promote/component';
// import { PerformanceWidgetModule } from '@scaleo/dashboard/shared/widgets/performance/component';
// import { ShortcutsWidgetModule } from '@scaleo/dashboard/shared/widgets/shortcut/component';
// import { TopOfferWidgetModule } from '@scaleo/dashboard/shared/widgets/top/components/offer/widget';
// import { AffiliateDashboardAnnouncementsWidgetModule } from '@scaleo/feature/affiliate/dashboard/widgets/announcements/widget';
// import { TopAffiliateWidgetModule } from '@scaleo/feature/manager/dashboard/widgets/top/components/affiliate/widget';
//
// import { PendingRecordsWidgetModule } from '../../../../../widgets/pending-records/component/src/lib/pending-records-widget.module';
import { DashboardGridComponent } from './dashboard-grid.component';

@NgModule({
    declarations: [DashboardGridComponent],
    imports: [
        CommonModule,
        GridsterModule,
        DashboardToolbarModule,
        // NetworkSummaryWidgetModule,
        // NotificationsWidgetModule,
        // PendingRecordsWidgetModule,
        // PerformanceWidgetModule,
        // TopOfferWidgetModule,
        // TopAffiliateWidgetModule,
        // ShortcutsWidgetModule,
        // MgcomTopModule,
        // OfferPromoteWidgetModule,
        DynamicWidgetModule,
        SharedModule
        // AffiliateDashboardAnnouncementsWidgetModule,
        // BalanceWidgetModule
    ],
    exports: [DashboardGridComponent]
})
export class DashboardGridModule {
    static forRoot(gridConfig: DashboardWidgetModel[]): ModuleWithProviders<any> {
        return {
            ngModule: DashboardGridModule,
            providers: [
                {
                    provide: GRID_CONFIG_TOKEN,
                    useValue: gridConfig
                }
            ]
        };
    }
}
