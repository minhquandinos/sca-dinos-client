import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { AllowedTagsModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { OfferProfileTargetingComponent } from './offer-profile-targeting.component';
import { ExtendedTargetingPipe } from './shared/pipes/extended-targeting.pipe';

@NgModule({
    declarations: [OfferProfileTargetingComponent, ExtendedTargetingPipe],
    imports: [CommonModule, SharedModule, UiButtonLinkModule, RouterModule, AllowedTagsModule, UiPageWrapperModule],
    exports: [OfferProfileTargetingComponent]
})
export class OfferProfileTargetingModule {}
