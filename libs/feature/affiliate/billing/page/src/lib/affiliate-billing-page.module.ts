import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { AffiliateBillingBalanceWidgetModule } from '@scaleo/affiliate-billing/balance/widget';
import { BillingAffiliatePaymentsMethodsModule } from '@scaleo/affiliate-billing/payment-methods/widget/list';
import { AffiliateAccessBillingPreferencesModule } from '@scaleo/feature/affiliate/billing/preferences/fields-view';
import { AffiliateAccessInvoicesWidgetModule } from '@scaleo/feature/affiliate/billing/widgets/invoices/list';
import { CustomFlexModule } from '@scaleo/ui-kit/custom-flex-layout';
import { UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { AffiliateBillingComponent } from './affiliate-billing.component';
import { AffiliateBillingAlertModule } from './components/affiliate-billing-alert/affiliate-billing-alert.module';

const routes: Routes = [
    {
        path: '',
        component: AffiliateBillingComponent,
        data: {
            header: 'main_navigation.billing'
        }
    },
    {
        path: ':id',
        loadChildren: (): Promise<any> =>
            import('@scaleo/feature/affiliate/billing/invoice/page').then((m) => m.AffiliateBillingInvoicePageModule)
    }
];

@NgModule({
    declarations: [AffiliateBillingComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AffiliateBillingAlertModule,
        BillingAffiliatePaymentsMethodsModule,
        AffiliateBillingBalanceWidgetModule,
        FlexLayoutModule,
        AffiliateAccessInvoicesWidgetModule,
        UiPageWrapperModule,
        CustomFlexModule,
        AffiliateAccessBillingPreferencesModule
    ],
    exports: [AffiliateBillingComponent]
})
export class AffiliateBillingPageModule {}
