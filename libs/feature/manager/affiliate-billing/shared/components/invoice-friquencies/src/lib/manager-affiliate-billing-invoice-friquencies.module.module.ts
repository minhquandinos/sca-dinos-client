import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { IsTruthyModule } from '@scaleo/shared/pipes';

import { BillingInvoiceFrequenciesComponent } from './billing-invoice-frequencies.component';
import { InvoiceFrequencyItemsTransformPipe } from './pipes/invoice-frequency-items-transform.pipe';
import { InvoiceFrequencySelectTitlePipe } from './pipes/invoice-frequency-select-title.pipe';

@NgModule({
    declarations: [BillingInvoiceFrequenciesComponent, InvoiceFrequencySelectTitlePipe, InvoiceFrequencyItemsTransformPipe],
    imports: [CommonModule, FindPlatformListModule, SharedModule, SelectModule, IsTruthyModule],
    exports: [BillingInvoiceFrequenciesComponent]
})
export class ManagerAffiliateBillingInvoiceFriquenciesModuleModule {}
