import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutosizeModule } from 'ngx-autosize';
import { NgxMaskModule } from 'ngx-mask';

import { SharedModule } from '@scaleo/core/shared/module';
import {
    ApiAccessModule,
    CustomFieldModule,
    CustomSwitchModule,
    FormLogoModule,
    InputModule,
    TextareaModule
} from '@scaleo/shared/components';
import { AddContactModule } from '@scaleo/shared/components/contact';
import {
    FindCountryModule,
    FindManagersModule,
    FindPlatformListModule,
    FindPlatformStatusesModule,
    FindSponsorModule
} from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiBrModule, UiButtonLinkModule, UiSkeletonModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AffiliateCreateComponent } from './affiliate-create.component';

@NgModule({
    declarations: [AffiliateCreateComponent],
    imports: [
        CommonModule,
        NgxMaskModule.forRoot(),
        AutosizeModule,
        SharedModule,
        FormLogoModule,
        AddContactModule,
        CustomFieldModule,
        UiButtonLinkModule,
        UiSvgIconModule,
        FindCountryModule,
        FindManagersModule,
        InputModule,
        TextareaModule,
        CustomSwitchModule,
        FindSponsorModule,
        FindPlatformStatusesModule,
        ApiAccessModule,
        UiBrModule,
        Modal3EditFormModule,
        FindPlatformListModule,
        DisableButtonDuringRequestDirectiveModule,
        UiSkeletonModule
    ]
})
export class ManagerAffiliateUpsertModalFormModule {}
