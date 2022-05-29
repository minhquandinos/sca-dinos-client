import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import {
    ManagerStatisticsNavigationComponent,
    ManagerStatisticsNavigationModule
} from '@scaleo/feature/manager/reports/statistics/shared/components/navigation/component';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { ReportsLayoutComponent, ReportsLayoutModule } from '@scaleo/reports/shared/layouts/list';

const routes: Routes = [
    {
        path: '',
        component: ReportsLayoutComponent,
        data: {
            header: 'main_navigation.statistics'
        },
        children: [
            {
                path: '',
                component: ManagerStatisticsNavigationComponent,
                outlet: 'navigation'
            },
            {
                path: '',
                redirectTo: 'statistics'
            },
            {
                path: 'statistics',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/reports/statistics/aggregations/pages').then(
                        (m) => m.ManagerReportsStatisticsAggregationsPagesModule
                    )
            },
            {
                path: 'referrals',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/manager/reports/statistics/referrals/page').then(
                        (m) => m.ManagerReportsStatisticsReferralsPageModule
                    ),
                canActivate: [NgxPermissionsGuard],
                canLoad: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canSeeReferralReports],
                        redirectTo: '/permission-denied'
                    }
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), ReportsLayoutModule, ManagerStatisticsNavigationModule],
    exports: [RouterModule]
})
export class ReportsRoutingModule {}
