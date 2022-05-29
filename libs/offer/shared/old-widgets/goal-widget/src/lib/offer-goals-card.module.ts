import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { OfferGoalCapTypeModule } from '@scaleo/offer/goal/shared/components/cap-type';
import { GoalChipModule } from '@scaleo/offer/goal/shared/components/chip';
import { OfferGoalTrackingMethodModule } from '@scaleo/offer/goal/shared/components/tracking-method';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ConversionStatusModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiChipModule, UiPageWrapperModule, UiSkeletonModule, UiTableModule } from '@scaleo/ui-kit/elements';

import { OfferGoalConversionStatusComponent } from './components/offer-goal-conversion-status/offer-goal-conversion-status.component';
import { OfferGoalNameComponent } from './components/offer-goal-name.component';
import { OfferGoalTypeNameComponent } from './components/offer-goal-type-name/offer-goal-type-name.component';
import { OfferProfileGoalsColumnsProvider } from './config/offer-profile-goals-table-columns.provider';
import { OfferGoalsCardComponent } from './offer-goals-card.component';

@NgModule({
    declarations: [OfferGoalsCardComponent, OfferGoalConversionStatusComponent, OfferGoalNameComponent, OfferGoalTypeNameComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiButtonLinkModule,
        UiTableModule,
        UiPageWrapperModule,
        RouterModule,
        UiSkeletonModule,
        OfferGoalCapTypeModule,
        OfferGoalTrackingMethodModule,
        ConversionStatusModule,
        UiChipModule,
        GoalChipModule,
        PlatformFormatPipeModule
    ],
    exports: [
        OfferGoalsCardComponent,
        UiTableModule,
        OfferGoalConversionStatusComponent,
        OfferGoalNameComponent,
        OfferGoalTypeNameComponent,
        OfferGoalCapTypeModule
    ],
    providers: [OfferProfileGoalsColumnsProvider]
})
export class OfferGoalsCardModule {}
