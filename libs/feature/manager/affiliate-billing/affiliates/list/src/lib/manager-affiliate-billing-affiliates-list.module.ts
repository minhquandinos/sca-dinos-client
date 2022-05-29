import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import {
    ConfigTableColumn2Module,
    CustomPaginationModule,
    ManagerListModule,
    NavigateRootModule,
    ReportExportModule,
    ResultCountModule
} from '@scaleo/shared/components';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import {
    TableNavigationModule,
    UiButtonLinkModule,
    UiDividerModule,
    UiPageWrapperModule,
    UiStatusColorModule,
    UiSvgIconModule,
    UiTable2Module
} from '@scaleo/ui-kit/elements';

import { BillingAffiliatesFiltersModule } from './components/billing-affiliates-filters/billing-affiliates-filters.module';
import { PaymentMethodsListModule } from './components/payment-methods-list/payment-methods-list.module';
import { ManagerAffiliateBillingAffiliatesListComponent } from './manager-affiliate-billing-affiliates-list.component';
import { InvoiceFrequencyPipe } from './pipes/invoice-frequency.pipe';
import { PaymentTermsPipe } from './pipes/payment-terms.pipe';

@NgModule({
    declarations: [ManagerAffiliateBillingAffiliatesListComponent, InvoiceFrequencyPipe, PaymentTermsPipe],
    imports: [
        CommonModule,
        RouterModule,
        UiTable2Module,
        ReportExportModule,
        ConfigTableColumn2Module,
        SharedModule,
        CustomPaginationModule,
        ResultCountModule,
        PlatformFormatPipeModule,
        UiStatusColorModule,
        ManagerListModule,
        NavigateRootModule,
        UiSvgIconModule,
        IsTruthyModule,
        TableNavigationModule,
        PaymentMethodsListModule,
        BillingAffiliatesFiltersModule,
        UiDividerModule,
        UiPageWrapperModule,
        UiButtonLinkModule
    ],
    exports: [ManagerAffiliateBillingAffiliatesListComponent]
})
export class ManagerAffiliateBillingAffiliatesListModule {}
