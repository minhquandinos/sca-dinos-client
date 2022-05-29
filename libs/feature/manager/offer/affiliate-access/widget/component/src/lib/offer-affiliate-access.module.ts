import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferAffiliateAccessEditModule } from '@scaleo/feature/manager/offer/affiliate-access/update/modal-form';
import { OfferVisibilityModule } from '@scaleo/offer/shared/fields/offer-visibility';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { AllowedTagsModule, CardWidgetModule, ExpandModule } from '@scaleo/shared/components';
import { DetailInfoModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { OfferAffiliateAccessComponent } from './offer-affiliate-access.component';

@NgModule({
    declarations: [OfferAffiliateAccessComponent],
    imports: [
        CommonModule,
        CardWidgetModule,
        SharedModule,
        UiButtonLinkModule,
        OfferVisibilityModule,
        AllowedTagsModule,
        PlatformFormatPipeModule,
        OfferAffiliateAccessEditModule,
        DetailInfoModule,
        ExpandModule
    ],
    exports: [OfferAffiliateAccessComponent]
})
export class OfferAffiliateAccessModule {}
