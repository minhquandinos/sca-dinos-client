import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferGoalCapTypeModule } from '@scaleo/offer/goal/shared/components/cap-type';
import { OfferGoalTrackingMethodModule } from '@scaleo/offer/goal/shared/components/tracking-method';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { StatusDotColorModule } from '@scaleo/shared/components';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { OfferGoalsColumnTitleComponent } from './components/offer-goals-column-title.component';

@NgModule({
    declarations: [OfferGoalsColumnTitleComponent],
    exports: [OfferGoalsColumnTitleComponent, OfferGoalCapTypeModule, OfferGoalTrackingMethodModule],
    imports: [CommonModule, StatusDotColorModule, UiSvgIconModule, SharedModule, PlatformFormatPipeModule]
})
export class OfferGoalsColumnsModule {}
