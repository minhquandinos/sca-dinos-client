import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { StatusColorModule } from '@scaleo/shared/components';
import { UiStatusColorModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferVisibilityComponent } from './offer-visibility.component';

@NgModule({
    declarations: [OfferVisibilityComponent],
    imports: [CommonModule, SharedModule, UiSvgIconModule, StatusColorModule, UiStatusColorModule],
    exports: [OfferVisibilityComponent]
})
export class OfferVisibilityModule {}
