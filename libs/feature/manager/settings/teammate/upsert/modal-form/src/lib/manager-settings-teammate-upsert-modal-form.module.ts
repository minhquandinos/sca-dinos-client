import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import {
    ApiAccessModule,
    CustomSwitchModule,
    FormLogoModule,
    InputModule,
    ManagerReferrerLinkToSignUpModule
} from '@scaleo/shared/components';
import { AddContactModule } from '@scaleo/shared/components/contact';
import { FindManagersModule, FindPlatformListModule, FindPlatformStatusesModule, FindRoleModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ManagerCreateComponent } from './manager-create.component';

@NgModule({
    declarations: [ManagerCreateComponent],
    imports: [
        CommonModule,
        SharedModule,
        Modal3EditFormModule,
        UiButtonLinkModule,
        FindManagersModule,
        FormLogoModule,
        InputModule,
        FindPlatformStatusesModule,
        FindPlatformListModule,
        CustomSwitchModule,
        AddContactModule,
        ManagerReferrerLinkToSignUpModule,
        ApiAccessModule,
        FindRoleModule,
        DisableButtonDuringRequestDirectiveModule
    ],
    exports: [ManagerCreateComponent]
})
export class ManagerSettingsTeammateUpsertModalFormModule {}
