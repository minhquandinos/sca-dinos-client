import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { RadioModule, UpgradePlanInfoModule } from '@scaleo/shared/components';

import { BillingInvoiceAutomaticallyComponent } from './billing-invoice-automatically.component';

@NgModule({
    declarations: [BillingInvoiceAutomaticallyComponent],
    imports: [CommonModule, RadioModule, UpgradePlanInfoModule, SharedModule],
    exports: [BillingInvoiceAutomaticallyComponent]
})
export class ManagerAffiliateBillingInvoiceAutomaticallyModule {}
