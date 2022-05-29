import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { InvoiceDownloadModule } from '@scaleo/invoice/shared/download/component';
import { InvoiceWidgetInfoModule } from '@scaleo/invoice/shared/widgets/info';
import { InvoiceWidgetTransactionsModule } from '@scaleo/invoice/shared/widgets/transactions';
import { StickyModule } from '@scaleo/shared/directives';
import { CustomFlexModule } from '@scaleo/ui-kit/custom-flex-layout';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AffiliateBillingInvoicePageComponent } from './affiliate-billing-invoice-page.component';

const routes: Routes = [
    {
        path: '',
        component: AffiliateBillingInvoicePageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CustomFlexModule,
        FlexModule,
        InvoiceDownloadModule,
        InvoiceWidgetInfoModule,
        StickyModule,
        UiButtonLinkModule,
        InvoiceWidgetTransactionsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AffiliateBillingInvoicePageComponent]
})
export class AffiliateBillingInvoicePageModule {}
