import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerDataAccessSettingsOffersModule } from '@scaleo/feature/manager/data-access/settings/offers';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { CustomSwitchModule, TextareaModule } from '@scaleo/shared/components';
import { CardModule, UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { OffersSettingsComponent } from './offers-settings.component';

const router = [
    {
        path: '',
        component: OffersSettingsComponent
    }
];

@NgModule({
    declarations: [OffersSettingsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
        SettingsCardModule,
        SharedModule,
        TextareaModule,
        CustomSwitchModule,
        UiButtonLinkModule,
        ManagerDataAccessSettingsOffersModule
    ]
})
export class ManagerSettingsOffersPageModule {}
