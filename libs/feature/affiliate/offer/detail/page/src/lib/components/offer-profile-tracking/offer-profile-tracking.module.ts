import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferSharedAffiliateTrackingLinkModule } from '@scaleo/offer/link-builder/shared/affiliate-tracking-link';
import { TargetingLinkBuilderModule } from '@scaleo/offer/targeting-link-builder/modal-form';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { FindAffiliatesModule } from '@scaleo/shared/components/find';
import { UiButtonLinkModule, UiChipModule, UiPageWrapperModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferProfileTrackingComponent } from './offer-profile-tracking.component';

@NgModule({
    declarations: [OfferProfileTrackingComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiButtonLinkModule,
        RouterModule,
        UiSvgIconModule,
        UiChipModule,
        UiPageWrapperModule,
        FindAffiliatesModule,
        OfferSharedAffiliateTrackingLinkModule,
        FieldTextInfoModule,
        TargetingLinkBuilderModule
    ],
    exports: [OfferProfileTrackingComponent]
})
export class OfferProfileTrackingModule {}
