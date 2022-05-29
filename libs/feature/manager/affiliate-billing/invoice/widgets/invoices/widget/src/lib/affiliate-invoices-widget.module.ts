import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';

import { PaymentMethodDetailModule } from '@scaleo/affiliate-billing/payment-methods/detail';
import { SharedModule } from '@scaleo/core/shared/module';
import { InvoiceLinkToDetailModule } from '@scaleo/invoice/shared/link-to-detail';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import { NavigateRootModule } from '@scaleo/shared/components';
import { TableNavigationModule, UiButtonLinkModule, UiPageWrapperModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { AffiliateInvoicesWidgetComponent } from './affiliate-invoices-widget.component';

@NgModule({
    declarations: [AffiliateInvoicesWidgetComponent],
    imports: [
        CommonModule,
        UiSimpleTableModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        SharedModule,
        RouterModule,
        // Billing2InvoicesSharedModule,
        PaymentMethodDetailModule,
        PlatformFormatPipeModule,
        NavigateRootModule,
        TableNavigationModule,
        NgxPermissionsModule,
        PlatformStatusesModule,
        InvoiceLinkToDetailModule
    ],
    exports: [AffiliateInvoicesWidgetComponent]
})
export class AffiliateInvoicesWidgetModule {}
