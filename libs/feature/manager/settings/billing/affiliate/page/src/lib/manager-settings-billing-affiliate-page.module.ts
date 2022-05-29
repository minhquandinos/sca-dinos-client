import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateBillingInvoiceAutomaticallyModule } from '@scaleo/feature/manager/affiliate-billing/shared/components/invoice-automatically';
import { ManagerAffiliateBillingInvoiceFriquenciesModuleModule } from '@scaleo/feature/manager/affiliate-billing/shared/components/invoice-friquencies';
import {
    CustomInfoTooltipModule,
    CustomRadioModule,
    CustomSwitchModule,
    InputModule,
    RadioModule,
    TextareaModule
} from '@scaleo/shared/components';
import { FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import { UiBrModule } from '@scaleo/ui-kit/elements';

import { AffiliateBillingComponent } from './affiliate-billing.component';

const router = [
    {
        path: '',
        component: AffiliateBillingComponent
    }
];

@NgModule({
    declarations: [AffiliateBillingComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
        TextareaModule,
        CustomSwitchModule,
        SelectModule,
        SharedModule,
        CustomRadioModule,
        UiBrModule,
        RadioModule,
        IsTruthyModule,
        FindPlatformListModule,
        ManagerAffiliateBillingInvoiceFriquenciesModuleModule,
        ManagerAffiliateBillingInvoiceAutomaticallyModule,
        InputModule,
        FindPlatformStatusesModule,
        CustomInfoTooltipModule
    ]
})
export class ManagerSettingsBillingAffiliatePageModule {}
