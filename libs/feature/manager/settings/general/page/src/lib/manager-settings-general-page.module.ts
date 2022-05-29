import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerDataAccessSettingsGeneralModule } from '@scaleo/feature/manager/data-access/settings/general';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import { CountryFlagModule, CustomCheckboxModule, CustomSwitchModule, InputModule, ShowHideModule } from '@scaleo/shared/components';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { CustomTranslatePipeModule } from '@scaleo/shared/pipes';
import { UiBrModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { GeneralSettingsComponent } from './general-settings.component';

const router = [
    {
        path: '',
        component: GeneralSettingsComponent
    }
];

@NgModule({
    declarations: [GeneralSettingsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
        SharedModule,
        ShowHideModule,
        UiBrModule,
        SelectModule,
        InputModule,
        CustomCheckboxModule,
        CustomSwitchModule,
        AvailableMacrosModule,
        CountryFlagModule,
        FindPlatformListModule,
        CustomTranslatePipeModule,
        ManagerDataAccessSettingsGeneralModule,
        UiButtonLinkModule,
        SettingsCardModule
    ]
})
export class ManagerSettingsGeneralPageModule {}
