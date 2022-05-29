import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AFFILIATE_ACCESS_PERSIST_STATE } from '@scaleo/feature/affiliate/core/persist-state';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import {
    BreakdownEnum,
    NewReportStatisticsRouteEnum,
    newStatisticsBreakdowns,
    STATISTICS_BREAKDOWNS_TOKEN
} from '@scaleo/reports/statistic/common';
import {
    NewReportStatisticsComponent,
    NewReportStatisticsLayoutComponent,
    NewReportStatisticsModule
} from '@scaleo/reports/statistic/list';

const routes: Routes = [
    {
        path: '',
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
                component: NewReportStatisticsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        NewReportStatisticsModule.forRoot(
            {
                name: AFFILIATE_ACCESS_PERSIST_STATE.reportStatistics
            },
            [ReportFilterFilterEnum.Offer]
        ),
        RouterModule.forChild(routes)
    ],
    providers: [
        {
            provide: STATISTICS_BREAKDOWNS_TOKEN,
            useFactory: () => {
                return { ...newStatisticsBreakdowns, [NewReportStatisticsRouteEnum.Offer]: [{ breakdown: BreakdownEnum.Offer }] };
            }
        }
    ]
})
export class FeatureAffiliateReportsStatisticsAggregationsPageModule {}
