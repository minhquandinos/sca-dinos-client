import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { GenerateDeepLinkModule } from '@scaleo/feature/shared/mobile-app/generate-deep-link/component';
import { CustomSwitchModule } from '@scaleo/shared/components';
import { UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { MobileAppComponent } from './mobile-app.component';

const router = [
    {
        path: '',
        component: MobileAppComponent
    }
];

@NgModule({
    declarations: [MobileAppComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(router),
        SharedModule,
        CustomSwitchModule,
        UiSkeletonModule,
        GenerateDeepLinkModule,
        SettingsCardModule
    ]
})
export class ManagerSettingsMobileAppPageModule {}
