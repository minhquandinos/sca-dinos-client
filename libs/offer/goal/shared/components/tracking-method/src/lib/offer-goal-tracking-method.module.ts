import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { OfferGoalTrackingMethodComponent } from './offer-goal-tracking-method.component';

@NgModule({
    declarations: [OfferGoalTrackingMethodComponent],
    imports: [CommonModule, FieldTextInfoModule, AvailableMacrosModule, UiButtonLinkModule, PlatformListTranslateModule],
    exports: [OfferGoalTrackingMethodComponent]
})
export class OfferGoalTrackingMethodModule {}
