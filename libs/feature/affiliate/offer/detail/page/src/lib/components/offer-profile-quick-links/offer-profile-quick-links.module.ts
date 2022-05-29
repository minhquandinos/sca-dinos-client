import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule, UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { OfferProfileQuickLinksComponent } from './offer-profile-quick-links.component';

@NgModule({
    declarations: [OfferProfileQuickLinksComponent],
    exports: [OfferProfileQuickLinksComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule, UiPageWrapperModule, RouterModule]
})
export class OfferProfileQuickLinksModule {}
