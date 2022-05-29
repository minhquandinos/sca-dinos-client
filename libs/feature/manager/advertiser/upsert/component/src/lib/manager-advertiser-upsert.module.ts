import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import {
    ApiAccessModule,
    CustomFieldModule,
    CustomSwitchModule,
    FieldTextInfoModule,
    FormLogoModule,
    InputModule,
    TextareaModule
} from '@scaleo/shared/components';
import { AddContactModule } from '@scaleo/shared/components/contact';
import { FindCountryModule, FindManagersModule, FindPlatformListModule, FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiPageWrapperModule, UiSkeletonModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AdvertiserCreateComponent } from './advertiser-create.component';
import { AdvertiserSecurityTokenComponent } from './components/advertiser-security-token/advertiser-security-token.component';

@NgModule({
    declarations: [AdvertiserCreateComponent, AdvertiserSecurityTokenComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormLogoModule,
        AddContactModule,
        CustomFieldModule,
        InputModule,
        SelectModule,
        UiSvgIconModule,
        UiButtonLinkModule,
        TextareaModule,
        FindManagersModule,
        CustomSwitchModule,
        FindCountryModule,
        UiPageWrapperModule,
        ApiAccessModule,
        FieldTextInfoModule,
        Modal3EditFormModule,
        DisableButtonDuringRequestDirectiveModule,
        FindPlatformStatusesModule,
        FindPlatformListModule,
        UiSkeletonModule
    ],
    exports: [AdvertiserCreateComponent]
})
export class ManagerAdvertiserUpsertModule {}
