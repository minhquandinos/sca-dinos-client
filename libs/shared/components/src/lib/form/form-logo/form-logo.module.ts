import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { CustomImageCropperModule } from '../../image-cropper/custom-image-cropper.module';
import { FormLogoComponent } from './form-logo.component';

@NgModule({
    declarations: [FormLogoComponent],
    imports: [CommonModule, CustomImageCropperModule, UiButtonLinkModule],
    exports: [FormLogoComponent]
})
export class FormLogoModule {}
