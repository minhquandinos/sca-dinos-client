import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { InputModule } from '@scaleo/shared/components';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiButtonLinkModule, UiSimpleTableModule } from '@scaleo/ui-kit/elements';

import { OfferDistributionAbTestingItemComponent } from './components/offer-distribution-ab-testing-item/offer-distribution-ab-testing-item.component';
import { OfferDistributionAbTestingCountLetterPipe } from './components/offer-distribution-ab-testing-item/pipes/offer-distribution-ab-testing-count-letter.pipe';
import { OfferDistributionLandingExcludePipe } from './components/offer-distribution-ab-testing-item/pipes/offer-distribution-landing-exclude.pipe';
import { OfferDistributionAbTestingLandingsComponent } from './components/offer-distribution-ab-testing-landings/offer-distribution-ab-testing-landings.component';
import { OfferDistributionAbTestingComponent } from './offer-distribution-ab-testing.component';

@NgModule({
    declarations: [
        OfferDistributionAbTestingComponent,
        OfferDistributionAbTestingItemComponent,
        OfferDistributionLandingExcludePipe,
        OfferDistributionAbTestingCountLetterPipe,
        OfferDistributionAbTestingLandingsComponent
    ],
    imports: [CommonModule, UiSimpleTableModule, InputModule, UiButtonLinkModule, SharedModule, SelectModule, PlatformFormatPipeModule],
    exports: [OfferDistributionAbTestingComponent]
})
export class OfferDistributionAbTestingModule {}
