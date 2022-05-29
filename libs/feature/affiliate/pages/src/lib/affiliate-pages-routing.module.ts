import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AffiliateUserProfileComponent, AffiliateUserProfileModule } from '@scaleo/feature/affiliate/user-profile';
import { AuthLanguagesComponent, AuthLanguagesModule } from '@scaleo/feature/auth/shared/languages';
import {
    AssignedManagersComponent,
    AssignedManagersModule,
    DesktopMenuComponent,
    HelpMenuModule,
    MenuModule,
    MobileMenuComponent,
    PageTitleComponent,
    PageTitleModule,
    PlatformLogoComponent,
    PlatformLogoModule,
    PoweredByComponent,
    PoweredByModule
} from '@scaleo/shared/layout/components';
import { ScaleoLayoutComponent, ScaleoLayoutEnum } from '@scaleo/ui-kit/layout';

import { AffiliatePagesComponent } from './affiliate-pages.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationsModule } from './components/notifications/notifications.module';

const routes: Routes = [
    {
        path: '',
        component: AffiliatePagesComponent,
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
                        component: AffiliateUserProfileComponent,
                        outlet: 'userProfile'
                    },
                    {
                        path: '',
                        component: AuthLanguagesComponent,
                        outlet: 'languages'
                    },
                    {
                        path: '',
                        component: NotificationsComponent,
                        outlet: 'helpMenu'
                    },
                    {
                        path: '',
                        component: AssignedManagersComponent,
                        outlet: 'assigned-managers'
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'dashboard'
                    },
                    {
                        path: 'dashboard',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/affiliate/dashboard/page').then((m) => m.AffiliateAccessDashboardPageModule)
                    },
                    {
                        path: 'offers',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/affiliate/offer/pages').then((m) => m.AffiliateOfferPagesModule)
                    },
                    {
                        path: 'reports',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/affiliate/reports/statistics/pages').then(
                                (m) => m.FeatureAffiliateReportsStatisticsPagesModule
                            )
                    },
                    {
                        path: 'transactions',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/affiliate/reports/transactions/pages').then(
                                (m) => m.AffiliateReportsTransactionsPagesModule
                            )
                    },
                    {
                        path: 'billing',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/affiliate/billing/page').then((m) => m.AffiliateBillingPageModule)
                    },
                    {
                        path: 'tools',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/affiliate/tools/pages').then((m) => m.AffiliateAccessToolsPagesModule)
                    },
                    {
                        path: 'referrals',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/affiliate/referral/list/page').then((m) => m.AffiliateAccessReferralListPageModule)
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        MenuModule,
        PlatformLogoModule,
        PoweredByModule,
        PageTitleModule,
        HelpMenuModule,
        AffiliateUserProfileModule,
        AuthLanguagesModule,
        NotificationsModule,
        AssignedManagersModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AffiliatePagesRoutingModule {}
