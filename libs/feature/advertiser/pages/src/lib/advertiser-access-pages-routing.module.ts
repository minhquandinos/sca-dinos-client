import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvertiserUserProfileComponent } from '@scaleo/feature/advertiser/user-profile';
import {
    AssignedManagersComponent,
    DesktopMenuComponent,
    MobileMenuComponent,
    PageTitleComponent,
    PlatformLogoComponent,
    PoweredByComponent
} from '@scaleo/shared/layout/components';
import { ScaleoLayoutComponent, ScaleoLayoutEnum } from '@scaleo/ui-kit/layout';

import { AdvertiserAccessPagesComponent } from './advertiser-access-pages.component';

const routes: Routes = [
    {
        path: '',
        component: AdvertiserAccessPagesComponent,
        children: [
            {
                path: '',
                component: ScaleoLayoutComponent,
                data: {
                    layout: ScaleoLayoutEnum.Panel
                },
                children: [
                    {
                        path: '',
                        component: PlatformLogoComponent,
                        outlet: 'logo'
                    },
                    {
                        path: '',
                        component: PoweredByComponent,
                        outlet: 'powered-by'
                    },
                    {
                        path: '',
                        component: DesktopMenuComponent,
                        outlet: 'desktop-menu'
                    },
                    {
                        path: '',
                        component: MobileMenuComponent,
                        outlet: 'mobile-menu'
                    },
                    {
                        path: '',
                        component: PageTitleComponent,
                        outlet: 'page-title'
                    },
                    {
                        path: '',
                        component: AdvertiserUserProfileComponent,
                        outlet: 'userProfile'
                    },
                    {
                        path: '',
                        component: AssignedManagersComponent,
                        outlet: 'assigned-managers'
                    },
                    // {
                    //     path: '',
                    //     component: NotificationsComponent,
                    //     outlet: 'helpMenu'
                    // },
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'dashboard'
                    },
                    {
                        path: 'dashboard',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/advertiser/dashboard/page').then((m) => m.AdvertiserAccessDashboardModule)
                    },
                    {
                        path: 'offers',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/advertiser/offer/pages').then((m) => m.FeatureAdvertiserOfferPagesModule)
                    },
                    {
                        path: 'reports',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/advertiser/reports/pages').then((m) => m.FeatureAdvertiserReportsPagesModule)
                    },
                    {
                        path: 'transactions',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/advertiser/reports/transactions/pages').then(
                                (m) => m.AdvertiserReportsTransactionsPagesModule
                            )
                    },
                    {
                        path: 'tools',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/advertiser/tools/pages').then((m) => m.AdvertiserToolsPagesModule)
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdvertiserAccessPagesRoutingModule {}
