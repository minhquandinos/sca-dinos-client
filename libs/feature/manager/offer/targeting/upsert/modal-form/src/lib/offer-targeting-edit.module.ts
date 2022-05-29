import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ExtendedTargetingModule } from '@scaleo/feature/manager/offer/targeting/shared/components/extended-targeting';
import { CustomSwitchModule } from '@scaleo/shared/components';
import { MultiSelectBlockModule } from '@scaleo/shared/components2/multi-select-block';
import { GeoPipeModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { OfferTargetingEditComponent } from './offer-targeting-edit.component';

@NgModule({
    declarations: [OfferTargetingEditComponent],
    imports: [
        CommonModule,
        Modal3EditFormModule,
        SharedModule,
        UiButtonLinkModule,
        MultiSelectBlockModule,
        CustomSwitchModule,
        ExtendedTargetingModule,
        GeoPipeModule
    ]
})
export class OfferTargetingEditModule {}
