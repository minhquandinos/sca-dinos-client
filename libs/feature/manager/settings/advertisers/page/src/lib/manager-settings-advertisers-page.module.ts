import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerDataAccessSettingsAdvertisersModule } from '@scaleo/feature/manager/data-access/settings/advertisers';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { SettingsAddCustomFieldModule } from '@scaleo/feature/manager/settings/shared/add-custom-fields';
import { ManagerSettingsSignupPageLinkModule } from '@scaleo/feature/manager/settings/shared/components/signup-page-link';
import { ManagerSettingsSignupProcessSelectModule } from '@scaleo/feature/manager/settings/shared/components/signup-process-select';
import { ForbiddenSignupFieldsModule } from '@scaleo/feature/manager/settings/shared/forbidden-signup-fields';
import { CustomSwitchModule, InputModule } from '@scaleo/shared/components';
import { FindManagersModule, FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiBrModule, UiButtonLinkModule, UiChipModule } from '@scaleo/ui-kit/elements';

import { AdvertiserSignupComponent } from './advertiser-signup/advertiser-signup.component';
import { AdvertisersComponent } from './advertisers.component';

const router = [
    {
        path: '',
        component: AdvertisersComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'signup'
            },
            {
                path: 'signup',
                component: AdvertiserSignupComponent
            }
        ]
    }
];

@NgModule({
    declarations: [AdvertisersComponent, AdvertiserSignupComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
        SharedModule,
        UiButtonLinkModule,
        SettingsAddCustomFieldModule,
        CustomSwitchModule,
        FindManagersModule,
        UiBrModule,
        SelectModule,
        InputModule,
        UiChipModule,
        ManagerSettingsSignupProcessSelectModule,
        ManagerSettingsSignupPageLinkModule,
        FindPlatformListModule,
        ForbiddenSignupFieldsModule,
        ManagerDataAccessSettingsAdvertisersModule,
        SettingsCardModule
    ]
})
export class ManagerSettingsAdvertisersPageModule {}
