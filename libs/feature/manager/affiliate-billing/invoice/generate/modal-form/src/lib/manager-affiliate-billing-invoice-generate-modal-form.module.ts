import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaymentMethodDetailModule } from '@scaleo/affiliate-billing/payment-methods/detail';
import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformCurrencyPipeModule } from '@scaleo/platform/currency/pipe';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import {
    CustomFileUploadModule,
    CustomSwitchModule,
    InputDateModule,
    InputModule,
    ShowHideModule,
    TextareaModule
} from '@scaleo/shared/components';
import {
    FindAffiliatesModule,
    FindPaymentMethodsModule,
    FindPlatformListModule,
    FindPlatformStatusesModule
} from '@scaleo/shared/components/find';
import { AttachmentFileModule } from '@scaleo/shared/components2/attachment-file';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiBrModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { Billing2InvoiceGenerateComponent } from './billing2-invoice-generate.component';
import { InvoicePeriodBalanceComponent } from './components/invoice-period-balance.component';

@NgModule({
    declarations: [Billing2InvoiceGenerateComponent, InvoicePeriodBalanceComponent],
    imports: [
        CommonModule,
        FindAffiliatesModule,
        SharedModule,
        ShowHideModule,
        FindPlatformListModule,
        CustomSwitchModule,
        TextareaModule,
        FindPaymentMethodsModule,
        PaymentMethodDetailModule,
        FindPlatformStatusesModule,
        CustomFileUploadModule,
        AttachmentFileModule,
        InputModule,
        PlatformCurrencyPipeModule,
        UiBrModule,
        InputDateModule,
        PlatformFormatPipeModule,
        IsTruthyModule,
        Modal3EditFormModule,
        UiButtonLinkModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class ManagerAffiliateBillingInvoiceGenerateModalFormModule {}
