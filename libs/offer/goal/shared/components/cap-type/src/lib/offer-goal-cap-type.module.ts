import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { PlatformListTranslateModule } from '@scaleo/platform/list/pipe';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferGoalCapTypeComponent } from './offer-goal-cap-type.component';

@NgModule({
    declarations: [OfferGoalCapTypeComponent],
    imports: [CommonModule, SharedModule, PlatformFormatPipeModule, UiSvgIconModule, PlatformListTranslateModule],
    exports: [OfferGoalCapTypeComponent]
})
export class OfferGoalCapTypeModule {}
