import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import { PlatformCurrencyPipeModule } from '@scaleo/platform/currency/pipe';
import { CustomSearchModule, CustomSwitchModule, FieldTextInfoModule, InputModule } from '@scaleo/shared/components';
import { FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AddCaps2Component } from './components/add-caps2/add-caps2.component';
import { OfferGoalCreateComponent } from './offer-goal-create.component';
import { HideCpcGoalTypePipe } from './pipes/hide-cpc-goal-type.pipe';
import { RevenuePayoutSymbolPipe } from './pipes/revenue-payout-symbol.pipe';

@NgModule({
    declarations: [OfferGoalCreateComponent, HideCpcGoalTypePipe, AddCaps2Component, RevenuePayoutSymbolPipe],
    imports: [
        CommonModule,
        SharedModule,
        CustomSearchModule,
        UiSkeletonModule,
        UiSvgIconModule,
        CustomSwitchModule,
        UiButtonLinkModule,
        InputModule,
        AvailableMacrosModule,
        FieldTextInfoModule,
        FindPlatformStatusesModule,
        FindPlatformListModule,
        Modal3EditFormModule,
        PlatformCurrencyPipeModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class OfferGoalCreateModule {}
