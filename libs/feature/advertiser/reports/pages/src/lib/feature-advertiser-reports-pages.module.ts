import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AdvertiserAccessStatisticsNavigationComponent,
    AdvertiserAccessStatisticsNavigationModule
} from '@scaleo/feature/advertiser/reports/statistics/shared/components/navigation';
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
                component: AdvertiserAccessStatisticsNavigationComponent,
                outlet: 'navigation'
            },
            {
                path: '',
                redirectTo: 'statistics'
            },
            {
                path: 'statistics',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/advertiser/reports/statistics/aggregations/page').then(
                        (m) => m.AdvertiserAccessReportAggregationsPageModule
                    )
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, AdvertiserAccessStatisticsNavigationModule, RouterModule.forChild(routes)]
})
export class FeatureAdvertiserReportsPagesModule {}
