import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformCurrencyPipeModule } from '@scaleo/platform/currency/pipe';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { InputModule } from '@scaleo/shared/components';
import { StopPropagationDirectiveModule } from '@scaleo/shared/directives';
import { UiButtonLinkModule, UiPageWrapperModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { Billing2InvoiceAdjustmentComponent } from './components/billing2-invoice-adjustment/billing2-invoice-adjustment.component';
import { Billing2InvoiceAdvanceComponent } from './components/billing2-invoice-advance/billing2-invoice-advance.component';
import { Billing2InvoiceSummaryComponent } from './components/billing2-invoice-summary/billing2-invoice-summary.component';
import { Billing2InvoiceTransactionsCardComponent } from './components/billing2-invoice-transactions-card/billing2-invoice-transactions-card.component';
import { InvoiceTransactionTypePipe } from './components/billing2-invoice-transactions-card/pipes/invoice-transaction-type.pipe';

@NgModule({
    declarations: [
        Billing2InvoiceTransactionsCardComponent,
        Billing2InvoiceAdjustmentComponent,
        Billing2InvoiceSummaryComponent,
        Billing2InvoiceAdvanceComponent,
        InvoiceTransactionTypePipe
    ],
    imports: [
        CommonModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        UiSimpleTableModule,
        PlatformFormatPipeModule,
        SharedModule,
        StopPropagationDirectiveModule,
        InputModule,
        PlatformCurrencyPipeModule
    ],
    exports: [Billing2InvoiceTransactionsCardComponent]
})
export class InvoiceWidgetTransactionsModule {}
