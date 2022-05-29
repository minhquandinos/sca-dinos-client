import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPermissionsRestrictStubModule } from 'ngx-permissions';

import { SharedModule } from '@scaleo/core/shared/module';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { FindAffiliatesModule } from '@scaleo/shared/components/find';
import { StopPropagationDirectiveModule } from '@scaleo/shared/directives';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferSharedAffiliateTrackingLinkComponent } from './offer-shared-affiliate-tracking-link.component';

@NgModule({
    declarations: [OfferSharedAffiliateTrackingLinkComponent],
    imports: [
        CommonModule,
        FindAffiliatesModule,
        SharedModule,
        UiSvgIconModule,
        NgxPermissionsRestrictStubModule,
        FieldTextInfoModule,
        StopPropagationDirectiveModule
    ],
    exports: [OfferSharedAffiliateTrackingLinkComponent]
})
export class OfferSharedAffiliateTrackingLinkModule {}
