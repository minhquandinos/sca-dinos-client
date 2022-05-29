import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PaymentMethodDetailModule } from '@scaleo/affiliate-billing/payment-methods/detail';
import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateBillingInvoiceEditModalFormModule } from '@scaleo/feature/manager/affiliate-billing/invoice/edit/modal-form';
import { ManagerAffiliateBillingInvoiceGenerateModalFormModule } from '@scaleo/feature/manager/affiliate-billing/invoice/generate/modal-form';
import { InvoiceAttachmentModule } from '@scaleo/invoice/shared/attachment';
import { InvoiceDownloadModule } from '@scaleo/invoice/shared/download/component';
import { InvoiceLinkToDetailModule } from '@scaleo/invoice/shared/link-to-detail';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformStatusesModule } from '@scaleo/platform/statuses';
import {
    ConfigTableColumn2Module,
    CustomDateRangeModule,
    CustomFileUploadModule,
    CustomPaginationModule,
    DropdownPopupModule,
    FiltersModule,
    HyperlinkModule,
    NavigateRootModule,
    OutputSelectedFiltersModule,
    ReportExportModule,
    ReportLastUpdatedModule,
    ResultCountModule
} from '@scaleo/shared/components';
import {
    FindAffiliatesModule,
    FindPaymentMethodsModule,
    FindPlatformListModule,
    FindPlatformStatusesModule
} from '@scaleo/shared/components/find';
import { TruncateTextPipeModule } from '@scaleo/shared/pipes';
import {
    DropdownMenuModule,
    TableNavigationModule,
    UiButtonLinkModule,
    UiDividerModule,
    UiImageModule,
    UiPageWrapperModule,
    UiSvgIconModule,
    UiTable2Module
} from '@scaleo/ui-kit/elements';

// import { Billing2InvoicesSharedModule } from './billing2-invoices-shared.module';
import { AffiliateInvoiceMultiChangeStatusComponent } from './components/affiliate-invoice-multi-change-status/affiliate-invoice-multi-change-status.component';
import { Billing2InvoicesComponent } from './components/billing2-invoices/billing2-invoices.component';
import { Billing2InvoicesFilterComponent } from './components/billing2-invoices-filter/billing2-invoices-filter.component';

@NgModule({
    declarations: [Billing2InvoicesComponent, Billing2InvoicesFilterComponent, AffiliateInvoiceMultiChangeStatusComponent],
    imports: [
        CommonModule,
        RouterModule,
        UiTable2Module,
        CustomPaginationModule,
        UiPageWrapperModule,
        ConfigTableColumn2Module,
        SharedModule,
        ResultCountModule,
        HyperlinkModule,
        PlatformFormatPipeModule,
        NavigateRootModule,
        UiImageModule,
        UiButtonLinkModule,
        ReportLastUpdatedModule,
        CustomDateRangeModule,
        ManagerAffiliateBillingInvoiceGenerateModalFormModule,
        ManagerAffiliateBillingInvoiceEditModalFormModule,
        FindPlatformStatusesModule,
        FiltersModule,
        DropdownPopupModule,
        FindAffiliatesModule,
        FindPlatformListModule,
        OutputSelectedFiltersModule,
        FindPaymentMethodsModule,
        ReportExportModule,
        UiSvgIconModule,
        PaymentMethodDetailModule,
        CustomFileUploadModule,
        TableNavigationModule,
        InvoiceDownloadModule,
        UiDividerModule,
        DropdownMenuModule,
        PlatformStatusesModule,
        TruncateTextPipeModule,
        RouterModule,
        InvoiceLinkToDetailModule,
        InvoiceAttachmentModule
    ]
})
export class Billing2InvoicesModule {}
