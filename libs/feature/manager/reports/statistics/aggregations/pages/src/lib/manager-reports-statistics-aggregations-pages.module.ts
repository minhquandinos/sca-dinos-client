import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

import { MANAGER_ACCESS_PERSIST_STATE } from '@scaleo/feature/manager/core/persist-state';
import { PLATFORM_PERMISSIONS } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { newStatisticsBreakdowns, STATISTICS_BREAKDOWNS_TOKEN } from '@scaleo/reports/statistic/common';
import {
    NewReportStatisticsComponent,
    NewReportStatisticsLayoutComponent,
    NewReportStatisticsModule
} from '@scaleo/reports/statistic/list';

const routes: Routes = [
    {
        path: '',
        // resolve: {
        //     data: NewReportStatisticsQueryParamsResolver
        // },
        component: NewReportStatisticsLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'day'
            },
            {
                path: 'general',
                component: NewReportStatisticsComponent
            },
            {
                path: 'day',
                component: NewReportStatisticsComponent
            },
            {
                path: 'month',
                component: NewReportStatisticsComponent
            },
            {
                path: 'affiliate',
                component: NewReportStatisticsComponent
            },
            {
                path: 'advertiser',
                component: NewReportStatisticsComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PERMISSIONS.canAccessAdvertisers],
                        redirectTo: '/permission-denied'
                    }
                }
            },
            {
                path: 'offer',
                component: NewReportStatisticsComponent
            },
            {
                path: 'goal',
                component: NewReportStatisticsComponent
            },
            {
                path: 'country',
                component: NewReportStatisticsComponent
            },
            {
                path: 'device-type',
                component: NewReportStatisticsComponent
            },
            {
                path: 'connection-type',
                component: NewReportStatisticsComponent
            },
            {
                path: 'os',
                component: NewReportStatisticsComponent
            },
            {
                path: 'smart-links',
                component: NewReportStatisticsComponent,
                canActivate: [NgxPermissionsGuard],
                data: {
                    permissions: {
                        only: [PLATFORM_PLAN_FEATURE.smartLink],
                        redirectTo: '/permission-denied'
                    }
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        NewReportStatisticsModule.forRoot({ name: MANAGER_ACCESS_PERSIST_STATE.reportStatistics }, [
            ReportFilterFilterEnum.Affiliate,
            ReportFilterFilterEnum.Offer,
            ReportFilterFilterEnum.Advertiser
        ]),
        RouterModule.forChild(routes)
    ],
    providers: [
        {
            provide: STATISTICS_BREAKDOWNS_TOKEN,
            useValue: newStatisticsBreakdowns
        }
    ]
})
export class ManagerReportsStatisticsAggregationsPagesModule {}
