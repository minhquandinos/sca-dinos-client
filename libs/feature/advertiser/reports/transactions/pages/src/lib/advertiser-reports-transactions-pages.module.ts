import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AdvertiserReportsTransactionsSharedNavigationModule,
    AdvertiserTransactionsNavigationComponent
} from '@scaleo/feature/advertiser/reports/transactions/shared/components/navigation';
import { ReportsLayoutComponent } from '@scaleo/reports/shared/layouts/list';

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
                component: AdvertiserTransactionsNavigationComponent,
                outlet: 'navigation'
            },
            {
                path: '',
                redirectTo: 'conversions'
            },
            {
                path: 'conversions',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/advertiser/reports/transactions/conversion/list/page').then(
                        (m) => m.FeatureAdvertiserReportsTransactionsConversionListPageModule
                    )
            },
            {
                path: 'clicks',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/advertiser/reports/transactions/click/page').then(
                        (m) => m.AdvertiserReportsTransactionsClickPageModule
                    )
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, AdvertiserReportsTransactionsSharedNavigationModule, RouterModule.forChild(routes)]
})
export class AdvertiserReportsTransactionsPagesModule {}
