import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { BrandingFormModule } from '@scaleo/feature/manager/settings/branding/form';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { BrandingComponent } from './branding.component';

const router = [
    {
        path: '',
        component: BrandingComponent
    }
];

@NgModule({
    declarations: [BrandingComponent],
    exports: [BrandingComponent],
    imports: [CommonModule, RouterModule.forChild(router), BrandingFormModule, SharedModule, UiButtonLinkModule, SettingsCardModule]
})
export class ManagerSettingsBrandingPageModule {}
