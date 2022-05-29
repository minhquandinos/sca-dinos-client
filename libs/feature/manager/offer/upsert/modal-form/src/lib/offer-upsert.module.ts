import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import {
    CustomDateRangeModule,
    CustomSwitchModule,
    FormLogoModule,
    InputModule,
    ShowHideModule,
    TextareaModule,
    WysiwygEditorModule
} from '@scaleo/shared/components';
import { FindAdvertisersModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { OfferUpsertComponent } from './offer-upsert.component';

@NgModule({
    declarations: [OfferUpsertComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormLogoModule,
        UiButtonLinkModule,
        CustomDateRangeModule,
        FindAdvertisersModule,
        UiSkeletonModule,
        SelectModule,
        InputModule,
        CustomSwitchModule,
        TextareaModule,
        AvailableMacrosModule,
        WysiwygEditorModule,
        Modal3EditFormModule,
        FindPlatformStatusesModule,
        FindPlatformListModule,
        ShowHideModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class OfferUpsertModule {}
