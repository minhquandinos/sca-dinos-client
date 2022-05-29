import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiAlertModule, UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AffiliateBillingAlertComponent } from './affiliate-billing-alert.component';

@NgModule({
    declarations: [AffiliateBillingAlertComponent],
    imports: [CommonModule, UiSvgIconModule, UiAlertModule, UiButtonLinkModule],
    exports: [AffiliateBillingAlertComponent]
})
export class AffiliateBillingAlertModule {}
