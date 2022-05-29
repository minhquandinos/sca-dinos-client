import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import {
    CustomRadioModule,
    CustomSwitchModule,
    FormLogoModule,
    InputModule,
    UpgradePlanInfoModule,
    WysiwygEditorModule
} from '@scaleo/shared/components';
import { FindOfferModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiBrModule, UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { AnnouncementsEditComponent } from './announcements-edit.component';

@NgModule({
    declarations: [AnnouncementsEditComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormLogoModule,
        InputModule,
        FindOfferModule,
        WysiwygEditorModule,
        CustomSwitchModule,
        AvailableMacrosModule,
        CustomRadioModule,
        UpgradePlanInfoModule,
        Modal3EditFormModule,
        UiBrModule,
        UiSkeletonModule,
        FindPlatformStatusesModule,
        UiButtonLinkModule
    ],
    exports: [AnnouncementsEditComponent]
})
export class AnnouncementsEditModule {}
