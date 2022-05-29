import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentMethodDetailModule } from '@scaleo/affiliate-billing/payment-methods/detail';
import { SharedModule } from '@scaleo/core/shared/module';
import { InvoiceAttachmentModule } from '@scaleo/invoice/shared/attachment';
import { InvoiceDownloadModule } from '@scaleo/invoice/shared/download/component';
import { InvoiceLinkToDetailModule } from '@scaleo/invoice/shared/link-to-detail';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import {
    ConfigTableColumn2Module,
    CustomPaginationModule,
    HyperlinkModule,
    NavigateRootModule,
    ReportExportModule
} from '@scaleo/shared/components';
import { TruncateTextPipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiPageWrapperModule, UiSvgIconModule, UiTable2Module } from '@scaleo/ui-kit/elements';

import { AffiliateInvoicesListComponent } from './affiliate-invoices-list.component';

@NgModule({
    declarations: [AffiliateInvoicesListComponent],
    imports: [
        CommonModule,
        UiButtonLinkModule,
        SharedModule,
        UiPageWrapperModule,
        UiTable2Module,
        RouterModule,
        PlatformFormatPipeModule,
        PaymentMethodDetailModule,
        CustomPaginationModule,
        ReportExportModule,
        ConfigTableColumn2Module,
        UiSvgIconModule,
        InvoiceDownloadModule,
        NavigateRootModule,
        HyperlinkModule,
        TruncateTextPipeModule,
        PlatformStatusesModule,
        InvoiceLinkToDetailModule,
        InvoiceAttachmentModule
    ],
    exports: [AffiliateInvoicesListComponent]
})
export class AffiliateInvoicesListModule {}
