import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ExtendedTargetingModule } from '@scaleo/feature/manager/offer/targeting/shared/components/extended-targeting';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomInfoTooltipModule, CustomSwitchModule, InputModule, ShowHideModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { MultiSelectBlockModule } from '@scaleo/shared/components2/multi-select-block';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { GeoPipeModule, IsTruthyModule, TruncateTextPipeModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { OfferLandingPageUpsertComponent } from './offer-landing-page-upsert.component';

@NgModule({
    declarations: [OfferLandingPageUpsertComponent],
    imports: [
        CommonModule,
        Modal3EditFormModule,
        SharedModule,
        UiButtonLinkModule,
        InputModule,
        FindPlatformStatusesModule,
        AvailableMacrosModule,
        UiSkeletonModule,
        ShowHideModule,
        CustomSwitchModule,
        MultiSelectBlockModule,
        PlatformFormatPipeModule,
        IsTruthyModule,
        CustomInfoTooltipModule,
        ExtendedTargetingModule,
        GeoPipeModule,
        TruncateTextPipeModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class OfferLandingPageUpsertModule {}
