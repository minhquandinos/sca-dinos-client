import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    AffiliateReportsTransactionsSharedNavigationModule,
    AffiliateTransactionsNavigationComponent
} from '@scaleo/feature/affiliate/reports/transactions/shared/components/navigation';
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
                component: AffiliateTransactionsNavigationComponent,
                outlet: 'navigation'
            },
            {
                path: '',
                redirectTo: 'conversions'
            },
            {
                path: 'conversions',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/reports/transactions/conversion/list/page').then(
                        (m) => m.AffiliateReportsTransactionsConversionListPageModule
                    )
            },
            {
                path: 'clicks',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/reports/transactions/click/page').then(
                        (m) => m.AffiliateReportsTransactionsClickPageModule
                    )
            },
            {
                path: 'invalid-clicks',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/reports/transactions/invalid-click/page').then(
                        (m) => m.AffiliateReportsTransactionsInvalidClickPageModule
                    )
            },
            {
                path: 'affiliates-postbacks',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/reports/transactions/affiliate-postback/page').then(
                        (m) => m.AffiliateReportsTransactionsAffiliatePostbackPageModule
                    )
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, AffiliateReportsTransactionsSharedNavigationModule, RouterModule.forChild(routes)]
})
export class AffiliateReportsTransactionsPagesModule {}
