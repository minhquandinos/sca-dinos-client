import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import {
    ManagerActivityLogListDateRangePlaceEnum,
    ManagerActivityLogListRouteDataEnum
} from '@scaleo/feature/manager/activity-log/list/data-access';
import { MANAGER_NAVIGATION_PATH } from '@scaleo/feature/manager/core/navigation';
import { UiInterfaceSwitcherComponent, UiInterfaceSwitcherModule } from '@scaleo/feature/manager/shared/layout/ui-interface-switcher';
import { ManagerUserProfileComponent, ManagerUserProfileModule } from '@scaleo/feature/manager/user-profile';
import { PermissionsPlansGuard } from '@scaleo/platform/permission/checker/guards';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { BASE_ROLE } from '@scaleo/platform/role/models';
import {
    DesktopMenuComponent,
    HelpMenuComponent,
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
import { TrialNotificationMessageComponent, TrialNotificationMessageModule } from '@scaleo/trial/notification-message';
import { ScaleoLayoutComponent, ScaleoLayoutEnum } from '@scaleo/ui-kit/layout';

import { ManagerPagesComponent } from './manager-pages.component';

const routes: Routes = [
    {
        path: '',
        component: ManagerPagesComponent,
        children: [
            {
                path: '',
                component: ScaleoLayoutComponent,
                data: {
                    layout: ScaleoLayoutEnum.Panel,
                    menuClass: 'admin-menu'
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
                        component: TrialNotificationMessageComponent,
                        outlet: 'trial'
                    },
                    // {
                    //     path: '',
                    //     component: '',
                    //     outlet: 'notifications'
                    // },
                    {
                        path: '',
                        component: HelpMenuComponent,
                        outlet: 'helpMenu'
                    },
                    {
                        path: '',
                        component: UiInterfaceSwitcherComponent,
                        outlet: 'interfaceSwitcher'
                    },
                    {
                        path: '',
                        component: ManagerUserProfileComponent,
                        outlet: 'userProfile'
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'dashboard'
                    },
                    {
                        path: MANAGER_NAVIGATION_PATH.dashboard.root.routePath,
                        canLoad: [PermissionsPlansGuard],
                        canActivate: [PermissionsPlansGuard],
                        data: {
                            permissions: {
                                only: [PLATFORM_PERMISSIONS.canAccessDashboard],
                                nextPage: '/manager/offers',
                                deniedPage: '/permission-denied'
                            }
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/dashboard/page').then((m) => m.ManagerDashboardPageModule)
                    },
                    {
                        path: 'getting-started',
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/getting-started/pages').then((m) => m.ManagerGettingStartedPagesModule)
                    },
                    {
                        path: MANAGER_NAVIGATION_PATH.affiliates.root.routePath,
                        canLoad: [PermissionsPlansGuard],
                        canActivate: [PermissionsPlansGuard],
                        data: {
                            permissions: {
                                only: [PLATFORM_PERMISSIONS.canAccessAffiliates],
                                nextPage: '/manager/advertisers',
                                deniedPage: '/permission-denied'
                            }
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/affiliate/pages').then((m) => m.ManagerAffiliatePagesModule)
                    },
                    {
                        path: MANAGER_NAVIGATION_PATH.advertisers.root.routePath,
                        canLoad: [PermissionsPlansGuard],
                        canActivate: [PermissionsPlansGuard],
                        data: {
                            permissions: {
                                only: [PLATFORM_PERMISSIONS.canAccessAdvertisers],
                                nextPage: '/manager/reports/statistics',
                                deniedPage: '/permission-denied'
                            }
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/advertiser/pages').then((m) => m.FeatureManagerAdvertiserPagesModule)
                    },
                    {
                        path: MANAGER_NAVIGATION_PATH.settings.root.routePath,
                        canLoad: [NgxPermissionsGuard],
                        canActivate: [NgxPermissionsGuard],
                        data: {
                            permissions: {
                                only: [BASE_ROLE.admin],
                                redirectTo: '/permission-denied'
                            }
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/settings/pages').then((m) => m.ManagerSettingsPagesModule)
                    },
                    {
                        path: 'billing',
                        canLoad: [PermissionsPlansGuard],
                        canActivate: [PermissionsPlansGuard],
                        data: {
                            permissions: {
                                only: [PLATFORM_PERMISSIONS.canAccessAffiliateBilling, PLATFORM_PERMISSIONS.canAccessAffiliateInvoices],
                                nextPage: '/manager/outbound',
                                deniedPage: '/permission-denied'
                            }
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/affiliate-billing/pages').then((m) => m.ManagerAffiliateBillingPagesModule)
                    },
                    {
                        path: MANAGER_NAVIGATION_PATH.offers.root.routePath,
                        canLoad: [PermissionsPlansGuard],
                        canActivate: [PermissionsPlansGuard],
                        data: {
                            permissions: {
                                only: [PLATFORM_PERMISSIONS.canAccessOffers],
                                nextPage: '/manager/affiliates',
                                deniedPage: '/permission-denied'
                            }
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/offer/pages').then((m) => m.ManagerOfferPagesModule)
                    },
                    {
                        path: 'reports',
                        canLoad: [PermissionsPlansGuard],
                        canActivate: [PermissionsPlansGuard],
                        data: {
                            permissions: {
                                only: [PLATFORM_PERMISSIONS.canAccessReports],
                                nextPage: '/manager/transactions',
                                deniedPage: '/permission-denied'
                            }
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/reports/statistics/page').then((m) => m.ReportsModule)
                    },
                    {
                        path: 'transactions',
                        canLoad: [NgxPermissionsGuard],
                        canActivate: [NgxPermissionsGuard],
                        data: {
                            permissions: {
                                only: [
                                    PLATFORM_PERMISSIONS.canAccessClicks,
                                    PLATFORM_PERMISSIONS.canAccessConversions,
                                    PLATFORM_PERMISSIONS.canAccessInvalidClicks,
                                    PLATFORM_PERMISSIONS.canAccessAdvertiserPostbacksLog,
                                    PLATFORM_PERMISSIONS.canAccessAffiliatePostbacksLog,
                                    PLATFORM_PERMISSIONS.canChangeConversionStatus
                                ],
                                redirectTo: '/permission-denied'
                            }
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/reports/transactions/page').then((m) => m.TransactionsReportsModule)
                    },
                    {
                        path: 'outbound',
                        canLoad: [NgxPermissionsGuard],
                        canActivate: [NgxPermissionsGuard],
                        data: {
                            permissions: {
                                only: [PLATFORM_PERMISSIONS.canAccessAnnouncements],
                                redirectTo: '/permission-denied'
                            }
                        },
                        loadChildren: () => import('@scaleo/feature/manager/outbound/pages').then((m) => m.ManagerOutboundModule)
                    },
                    {
                        path: 'activity-log',
                        canLoad: [NgxPermissionsGuard],
                        canActivate: [NgxPermissionsGuard],
                        data: {
                            header: 'main_navigation.activity_log',
                            permissions: {
                                only: [PLATFORM_PERMISSIONS.canAccessActivityLog],
                                redirectTo: '/permission-denied'
                            },
                            [ManagerActivityLogListRouteDataEnum.DataRangePosition]:
                                ManagerActivityLogListDateRangePlaceEnum.HeaderContainer
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/activity-log/list/page').then((m) => m.ManagerActivityLogListPageModule)
                    },
                    {
                        path: 'leads',
                        canLoad: [NgxPermissionsGuard],
                        canActivate: [NgxPermissionsGuard],
                        data: {
                            permissions: {
                                only: [
                                    PLATFORM_PERMISSIONS.canAccessLeads,
                                    PLATFORM_PERMISSIONS.canAccessLeadsLog,
                                    PLATFORM_PERMISSIONS.canManageLeadsCampaignsAndDelivery
                                ],
                                redirectTo: '/permission-denied'
                            }
                        },
                        loadChildren: (): Promise<any> =>
                            import('@scaleo/feature/manager/leads/pages').then((m) => m.ManagerLeadsUiPagesModule)
                    }
                    // {
                    //     path: 'not-found',
                    //     loadChildren: () => import('../modules/not-found/not-found.module').then((m) => m.ErrorPermissionDeniedModule)
                    // }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MenuModule,
        PlatformLogoModule,
        PoweredByModule,
        PageTitleModule,
        HelpMenuModule,
        TrialNotificationMessageModule,
        ManagerUserProfileModule,
        UiInterfaceSwitcherModule
    ],
    exports: [RouterModule]
})
export class FeatureManagerPagesModule {}
