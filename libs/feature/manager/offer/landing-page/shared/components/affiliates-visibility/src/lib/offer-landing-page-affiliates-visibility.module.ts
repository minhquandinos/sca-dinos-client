import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BooleanLabelModule } from '@scaleo/shared/components';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferLandingPageAffiliatesVisibilityComponent } from './offer-landing-page-affiliates-visibility.component';

@NgModule({
    declarations: [OfferLandingPageAffiliatesVisibilityComponent],
    imports: [CommonModule, BooleanLabelModule, UiSvgIconModule],
    exports: [OfferLandingPageAffiliatesVisibilityComponent]
})
export class OfferLandingPageAffiliatesVisibilityModule {}
