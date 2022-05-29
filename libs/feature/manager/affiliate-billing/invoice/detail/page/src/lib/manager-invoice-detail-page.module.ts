import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateBillingInvoiceEditModalFormModule } from '@scaleo/feature/manager/affiliate-billing/invoice/edit/modal-form';
import { ManagerBillingPreferencesFieldsViewModule } from '@scaleo/feature/manager/affiliate-billing/preferences/fields-view';
import { InvoiceDownloadModule } from '@scaleo/invoice/shared/download/component';
import { InvoiceWidgetInfoModule } from '@scaleo/invoice/shared/widgets/info';
import { InvoiceWidgetTransactionsModule } from '@scaleo/invoice/shared/widgets/transactions';
import { StickyModule } from '@scaleo/shared/directives';
import { CustomFlexModule } from '@scaleo/ui-kit/custom-flex-layout';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { Billing2InvoiceDetailComponent } from './billing2-invoice-detail.component';

const routes: Routes = [
    {
        path: '',
        component: Billing2InvoiceDetailComponent
    }
];

@NgModule({
    declarations: [Billing2InvoiceDetailComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UiButtonLinkModule,
        SharedModule,
        ManagerAffiliateBillingInvoiceEditModalFormModule,
        ManagerBillingPreferencesFieldsViewModule,
        InvoiceDownloadModule,
        FlexModule,
        StickyModule,
        CustomFlexModule,
        InvoiceWidgetInfoModule,
        InvoiceWidgetTransactionsModule
    ]
})
export class ManagerInvoiceDetailPageModule {}
