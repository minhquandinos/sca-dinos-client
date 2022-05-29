import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerDataAccessSettingsGeneralModule } from '@scaleo/feature/manager/data-access/settings/general';
import { CountryFlagModule, InputModule } from '@scaleo/shared/components';
import { AddContactModule } from '@scaleo/shared/components/contact';
import { FindPlatformListModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { CardModule, UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { StepAccountComponent } from './step-account.component';

const routes: Routes = [
    {
        path: '',
        component: StepAccountComponent
    }
];

@NgModule({
    declarations: [StepAccountComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        InputModule,
        SelectModule,
        AddContactModule,
        UiSkeletonModule,
        CountryFlagModule,
        FindPlatformListModule,
        ManagerDataAccessSettingsGeneralModule,
        CardModule,
        UiButtonLinkModule
    ],
    exports: [StepAccountComponent]
})
export class ManagerGettingStartedAccountPageModule {}
