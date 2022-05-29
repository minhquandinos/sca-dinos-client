import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BillingPreferencesViewModule } from '@scaleo/affiliate-billing/preferences/filds-view';
import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerAffiliateBillingPreferencesEditModule } from '@scaleo/feature/manager/affiliate-billing/preferences/edit';
import { DetailInfoModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ManagerBillingPreferencesComponent } from './manager-billing-preferences.component';

@NgModule({
    declarations: [ManagerBillingPreferencesComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiButtonLinkModule,
        DetailInfoModule,
        BillingPreferencesViewModule.forRoot(),
        ManagerAffiliateBillingPreferencesEditModule
    ],
    exports: [ManagerBillingPreferencesComponent]
})
export class ManagerBillingPreferencesFieldsViewModule {}
