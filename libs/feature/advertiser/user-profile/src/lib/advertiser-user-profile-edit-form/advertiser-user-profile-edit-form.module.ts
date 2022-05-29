import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import {
    CustomFieldModule,
    CustomSwitchModule,
    FieldTextInfoModule,
    FormLogoModule,
    InputModule,
    TextareaModule
} from '@scaleo/shared/components';
import { AddContactModule } from '@scaleo/shared/components/contact';
import { FindCountryModule, FindPlatformListModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AdvertiserUserProfileEditFormComponent } from './advertiser-user-profile-edit-form.component';

@NgModule({
    declarations: [AdvertiserUserProfileEditFormComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiButtonLinkModule,
        Modal3EditFormModule,
        FormLogoModule,
        InputModule,
        CustomSwitchModule,
        AddContactModule,
        FindCountryModule,
        TextareaModule,
        CustomFieldModule,
        FindPlatformListModule,
        FieldTextInfoModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class AdvertiserUserProfileEditFormModule {}
