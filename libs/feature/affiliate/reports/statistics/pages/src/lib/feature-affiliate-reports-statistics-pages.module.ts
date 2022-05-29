import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AffiliateAccessReportsStatisticsNavigationModule,
    AffiliateAccessStatisticsNavigationComponent
} from '@scaleo/feature/affiliate/reports/statistics/shared/components/navigation';
import { ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';

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
                component: AffiliateAccessStatisticsNavigationComponent,
                outlet: 'navigation'
            },
            {
                path: '',
                redirectTo: 'statistics'
            },
            {
                path: 'statistics',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/reports/statistics/aggregations/page').then(
                        (m) => m.FeatureAffiliateReportsStatisticsAggregationsPageModule
                    )
            },
            {
                path: 'referrals',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/reports/statistics/referrals/page').then(
                        (m) => m.AffiliateReportsStatisticsReferralsPageModule
                    ),
                canActivate: [] // TODO Add GUARD
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, AffiliateAccessReportsStatisticsNavigationModule, RouterModule.forChild(routes)]
})
export class FeatureAffiliateReportsStatisticsPagesModule {}
