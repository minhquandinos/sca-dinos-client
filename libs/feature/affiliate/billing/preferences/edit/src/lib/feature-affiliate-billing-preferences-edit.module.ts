import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { SelectModule } from '@scaleo/shared/components/select';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiBrModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AffiliateAccessBillingPreferencesEditComponent } from './affiliate-access-billing-preferences-edit.component';

@NgModule({
    declarations: [AffiliateAccessBillingPreferencesEditComponent],
    imports: [CommonModule, SharedModule, InputModule, UiBrModule, SelectModule, Modal3EditFormModule, UiButtonLinkModule]
})
export class FeatureAffiliateBillingPreferencesEditModule {}
