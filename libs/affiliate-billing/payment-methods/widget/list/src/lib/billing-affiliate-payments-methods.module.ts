import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaymentMethodDetailModule } from '@scaleo/affiliate-billing/payment-methods/detail';
import { AffiliatePaymentMethodsUpsertModule } from '@scaleo/affiliate-billing/payment-methods/upsert/modal-form';
import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CardWidgetModule } from '@scaleo/shared/components';
import { DisableButtonDuringRequestDirectiveModule, StopPropagationDirectiveModule } from '@scaleo/shared/directives';
import {
    TableNavigationModule,
    UiButtonLinkModule,
    UiSimpleTableModule,
    UiSkeletonModule,
    UiSvgIconModule,
    UiTableModule
} from '@scaleo/ui-kit/elements';

import { BillingAffiliatePaymentsMethodsComponent } from './billing-affiliate-payments-methods.component';
import { RequestPaymentModalModule } from './components/request-payment-modal/request-payment-modal.module';

@NgModule({
    declarations: [BillingAffiliatePaymentsMethodsComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiSvgIconModule,
        PlatformFormatPipeModule,
        AffiliatePaymentMethodsUpsertModule,
        TableNavigationModule,
        UiSimpleTableModule,
        UiTableModule,
        UiSkeletonModule,
        RequestPaymentModalModule,
        CardWidgetModule,
        UiButtonLinkModule,
        DisableButtonDuringRequestDirectiveModule,
        StopPropagationDirectiveModule,
        PaymentMethodDetailModule
    ],
    exports: [BillingAffiliatePaymentsMethodsComponent]
})
export class BillingAffiliatePaymentsMethodsModule {}
