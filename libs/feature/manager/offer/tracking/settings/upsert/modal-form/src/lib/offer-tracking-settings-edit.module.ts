import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import {
    CustomCheckboxModule,
    CustomSwitchModule,
    FieldTextInfoModule,
    InputModule,
    ShowHideModule,
    TextareaModule
} from '@scaleo/shared/components';
import { FindOfferModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { CustomTranslatePipeModule, IsTruthyModule } from '@scaleo/shared/pipes';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { OfferTrackingSettingsEditComponent } from './offer-tracking-settings-edit.component';

@NgModule({
    declarations: [OfferTrackingSettingsEditComponent],
    imports: [
        CommonModule,
        Modal3EditFormModule,
        UiButtonLinkModule,
        SharedModule,
        SelectModule,
        IsTruthyModule,
        FindOfferModule,
        InputModule,
        CustomSwitchModule,
        CustomCheckboxModule,
        FieldTextInfoModule,
        AvailableMacrosModule,
        TextareaModule,
        ShowHideModule,
        CustomTranslatePipeModule
    ],
    exports: [OfferTrackingSettingsEditComponent]
})
export class OfferTrackingSettingsEditModule {}
