import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

import { SharedModule } from '@scaleo/core/shared/module';
import { ManagerDataAccessSettingsBrandingModule } from '@scaleo/feature/manager/data-access/settings/branding';
import { SettingsCardModule } from '@scaleo/feature/manager/settings/shared';
import { CustomCheckboxModule, CustomImageCropperModule, InputModule, TextareaModule } from '@scaleo/shared/components';
import { SelectModule } from '@scaleo/shared/components/select';
import { UiBrModule, UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { BrandingFormComponent } from './branding-form.component';

@NgModule({
    imports: [
        CommonModule,
        CustomImageCropperModule,
        ColorPickerModule,
        SharedModule,
        UiButtonLinkModule,
        InputModule,
        SelectModule,
        UiBrModule,
        TextareaModule,
        CustomCheckboxModule,
        UiSvgIconModule,
        ManagerDataAccessSettingsBrandingModule,
        SettingsCardModule
    ],
    declarations: [BrandingFormComponent],
    exports: [BrandingFormComponent]
})
export class BrandingFormModule {}
