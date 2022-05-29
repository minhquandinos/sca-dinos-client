import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { StatusDotColorModule } from '@scaleo/shared/components';
import { UiStatusColorModule, UiStatusDotModule } from '@scaleo/ui-kit/elements';

import { OfferVisibilityAffiliateAccessComponent } from './offer-visibility-affiliate-access.component';

@NgModule({
    declarations: [OfferVisibilityAffiliateAccessComponent],
    exports: [OfferVisibilityAffiliateAccessComponent],
    imports: [CommonModule, UiStatusColorModule, SharedModule, StatusDotColorModule, UiStatusDotModule]
})
export class OfferVisibilityAffiliateAccessModule {}
