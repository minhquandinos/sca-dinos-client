import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaymentMethodDetailModule } from '@scaleo/affiliate-billing/payment-methods/detail';
import { BillingPreferencesViewModule } from '@scaleo/affiliate-billing/preferences/filds-view';
import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { HyperlinkModule, NavigateRootModule } from '@scaleo/shared/components';
import { DetailInfoModule, UiPageWrapperModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { Billing2InvoiceInfoCardComponent } from './billing2-invoice-info-card.component';

@NgModule({
    declarations: [Billing2InvoiceInfoCardComponent],
    imports: [
        CommonModule,
        SharedModule,
        BillingPreferencesViewModule,
        DetailInfoModule,
        UiPageWrapperModule,
        PlatformStatusesModule,
        HyperlinkModule,
        PlatformFormatPipeModule,
        PaymentMethodDetailModule,
        UiSkeletonModule,
        NavigateRootModule
    ],
    exports: [Billing2InvoiceInfoCardComponent]
})
export class InvoiceWidgetInfoModule {}
