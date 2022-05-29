import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { CustomSwitchModule } from '@scaleo/shared/components';
import { UiCard2Module } from '@scaleo/ui-kit/components/card2';
import { UiButtonLinkModule, UiDividerModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { SecurityComponent } from './security.component';

const routes: Routes = [
    {
        path: '',
        component: SecurityComponent
    }
];

@NgModule({
    declarations: [SecurityComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UiButtonLinkModule,
        SharedModule,
        CustomSwitchModule,
        UiSkeletonModule,
        SettingsCardModule
    ]
})
export class ManagerSettingsSecurityPageModule {}
