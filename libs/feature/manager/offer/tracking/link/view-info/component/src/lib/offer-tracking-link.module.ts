import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferSharedAffiliateTrackingLinkModule } from '@scaleo/offer/link-builder/shared/affiliate-tracking-link';
import { TargetingLinkBuilderModule } from '@scaleo/offer/targeting-link-builder/modal-form';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { DetailInfoModule, UiButtonLinkModule, UiChipModule } from '@scaleo/ui-kit/elements';

import { OfferTrackingLinkComponent } from './offer-tracking-link.component';

@NgModule({
    declarations: [OfferTrackingLinkComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiButtonLinkModule,
        OfferSharedAffiliateTrackingLinkModule,
        FieldTextInfoModule,
        UiChipModule,
        DetailInfoModule,
        TargetingLinkBuilderModule
    ],
    exports: [OfferTrackingLinkComponent]
})
export class OfferTrackingLinkModule {}
