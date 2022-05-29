import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import {
    ManagerTransactionsNavigationComponent,
    ManagerTransactionsNavigationModule
} from '@scaleo/feature/manager/reports/transactions/shared/components/navigation/component';
import { PermissionsPlansGuard } from '@scaleo/platform/permission/checker/guards';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { ReportsLayoutComponent, ReportsLayoutModule } from '@scaleo/reports/shared/layouts/list';

const routes: Routes = [
    {
        path: '',
        component: ReportsLayoutComponent,
        data: {
            header: 'main_navigation.transactions'
        },
        children: [
            {
                path: '',
                component: ManagerTransactionsNavigationComponent,
                outlet: 'navigation'
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'conversions'
            },
            {
                path: 'conversions',
                canLoad: [PermissionsPlansGuard],
                canActivate: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessConversions],
                        nextPage: '/manager/transactions/clicks',
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/reports/transactions/conversion/list/page').then(
                        (m) => m.ManagerReportConversionListPageModule
                    )
            },
            {
                path: 'clicks',
                canActivate: [PermissionsPlansGuard],
                canLoad: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessClicks],
                        nextPage: '/manager/transactions/invalid-clicks',
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/reports/transactions/click/page').then(
                        (m) => m.ManagerTransactionsReportClickPageModule
                    )
            },
            {
                path: 'invalid-clicks',
                canActivate: [PermissionsPlansGuard],
                canLoad: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessInvalidClicks],
                        nextPage: '/manager/transactions/advertiser-postbacks',
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/reports/transactions/invalid-click/page').then(
                        (m) => m.ManagerReportsTransactionsInvalidClickPageModule
                    )
            },
            {
                path: 'advertiser-postbacks',
                canActivate: [PermissionsPlansGuard],
                canLoad: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessAdvertiserPostbacksLog],
                        nextPage: '/manager/transactions/affiliates-postbacks',
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/reports/transactions/advertiser-postback/page').then(
                        (m) => m.ManagerReportsTransactionsAdvertiserPostbackPageModule
                    )
            },
            {
                path: 'affiliates-postbacks',
                canActivate: [PermissionsPlansGuard],
                canLoad: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessAffiliatePostbacksLog],
                        nextPage: '/manager/transactions/adjustments',
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/reports/transactions/affiliate-postback/page').then(
                        (m) => m.ManagerReportsTransactionsAffiliatePostbackPageModule
                    )
            },
            {
                path: 'adjustments',
                canActivate: [PermissionsPlansGuard],
                canLoad: [PermissionsPlansGuard],
                data: {
                    permissions: {
                        canLoadCheckType: 'every',
                        only: [
                            PLATFORM_PERMISSIONS.canChangeConversionStatus,
                            PLATFORM_PERMISSIONS.canAccessAdjustments,
                            PLATFORM_PERMISSIONS.canAccessOffers,
                            PLATFORM_PERMISSIONS.canAccessAffiliates
                        ],
                        deniedPage: '/permission-denied'
                    }
                },
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/reports/transactions/adjustment/list/page').then(
                        (m) => m.ManagerReportsTransactionsAdjustmentListPageModule
                    )
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), ReportsLayoutModule, ManagerTransactionsNavigationModule],
    exports: [RouterModule]
})
export class TransactionsReportsRoutingModule {}
