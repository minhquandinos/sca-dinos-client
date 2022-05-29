import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { DataAccessSettingsAffiliatesSignupModule } from '@scaleo/feature/manager/data-access/settings/affiliates';
import {
    AffiliateGeneralComponent,
    ManagerSettingsAffiliatesGeneralModule
} from '@scaleo/feature/manager/settings/affiliates/general/component';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { SettingsAddCustomFieldModule } from '@scaleo/feature/manager/settings/shared/add-custom-fields';
import { ManagerSettingsSignupPageLinkModule } from '@scaleo/feature/manager/settings/shared/components/signup-page-link';
import { ManagerSettingsSignupProcessSelectModule } from '@scaleo/feature/manager/settings/shared/components/signup-process-select';
import { ForbiddenSignupFieldsModule } from '@scaleo/feature/manager/settings/shared/forbidden-signup-fields';
import { CustomSwitchModule, InputModule } from '@scaleo/shared/components';
import { FindAffiliatesModule, FindManagersModule, FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { UiBrModule, UiButtonLinkModule, UiChipModule } from '@scaleo/ui-kit/elements';

import { AffiliatesComponent } from './affiliates.component';
import { AffiliateSignupComponent } from './components/affiliate-signup/affiliate-signup.component';
import { AffiliatesSignupSkeletonComponent } from './shared/components/affiliates-signup-skeleton/affiliates-signup-skeleton.component';

const router = [
    {
        path: '',
        component: AffiliatesComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'general'
            },
            {
                path: 'general',
                component: AffiliateGeneralComponent
            },
            {
                path: 'signup',
                component: AffiliateSignupComponent
            }
        ]
    }
];

@NgModule({
    declarations: [AffiliateSignupComponent, AffiliatesSignupSkeletonComponent, AffiliatesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
        SettingsAddCustomFieldModule,
        SharedModule,
        CustomSwitchModule,
        FindManagersModule,
        InputModule,
        UiBrModule,
        SelectModule,
        UiChipModule,
        FindAffiliatesModule,
        ManagerSettingsSignupProcessSelectModule,
        ManagerSettingsSignupPageLinkModule,
        FindPlatformListModule,
        DataAccessSettingsAffiliatesSignupModule,
        UiButtonLinkModule,
        ForbiddenSignupFieldsModule,
        SettingsCardModule,
        ManagerSettingsAffiliatesGeneralModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class ManagerSettingsAffiliatesPageModule {}
