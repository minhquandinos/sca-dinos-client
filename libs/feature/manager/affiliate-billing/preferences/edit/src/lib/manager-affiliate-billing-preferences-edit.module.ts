import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateBillingInvoiceAutomaticallyModule } from '@scaleo/feature/manager/affiliate-billing/shared/components/invoice-automatically';
import { ManagerAffiliateBillingInvoiceFriquenciesModuleModule } from '@scaleo/feature/manager/affiliate-billing/shared/components/invoice-friquencies';
import { InputModule } from '@scaleo/shared/components';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiBrModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ManagerAffiliateBillingPreferencesEditComponent } from './manager-affiliate-billing-preferences-edit.component';

@NgModule({
    declarations: [ManagerAffiliateBillingPreferencesEditComponent],
    imports: [
        CommonModule,
        FindPlatformListModule,
        SharedModule,
        InputModule,
        SelectModule,
        ManagerAffiliateBillingInvoiceFriquenciesModuleModule,
        ManagerAffiliateBillingInvoiceAutomaticallyModule,
        UiBrModule,
        Modal3EditFormModule,
        UiButtonLinkModule
    ]
})
export class ManagerAffiliateBillingPreferencesEditModule {}
