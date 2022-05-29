import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import {
    ApiAccessModule,
    CustomFieldModule,
    CustomSwitchModule,
    FormLogoModule,
    InputModule,
    ManagerReferrerLinkToSignUpModule,
    TextareaModule
} from '@scaleo/shared/components';
import { AddContactModule } from '@scaleo/shared/components/contact';
import { FindCountryModule, FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiPageWrapperModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AffiliateUserProfileEditFormComponent } from './affiliate-user-profile-edit-form.component';

@NgModule({
    declarations: [AffiliateUserProfileEditFormComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiPageWrapperModule,
        UiButtonLinkModule,
        FormLogoModule,
        InputModule,
        SelectModule,
        AddContactModule,
        CustomSwitchModule,
        UiSvgIconModule,
        FindCountryModule,
        TextareaModule,
        ApiAccessModule,
        ManagerReferrerLinkToSignUpModule,
        Modal3EditFormModule,
        FindPlatformListModule,
        CustomFieldModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class AffiliateUserProfileEditFormModule {}
