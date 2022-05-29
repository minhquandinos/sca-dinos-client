import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { BrandingFormModule } from '@scaleo/feature/manager/settings/branding/form';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { GettingStartedBrandingPageComponent } from './getting-started-branding-page.component';

const routes: Routes = [
    {
        path: '',
        component: GettingStartedBrandingPageComponent
    }
];

@NgModule({
    declarations: [GettingStartedBrandingPageComponent],
    imports: [CommonModule, BrandingFormModule, SharedModule, UiButtonLinkModule, SettingsCardModule, RouterModule.forChild(routes)],
    exports: [GettingStartedBrandingPageComponent]
})
export class GettingStartedBrandingPageModule {}
