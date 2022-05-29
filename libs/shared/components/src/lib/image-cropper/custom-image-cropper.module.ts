import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { CustomFileUploadModule } from '../custom-file-upload/custom-file-upload.module';
import { ImageCropperComponent } from './image-cropper.component';

@NgModule({
    declarations: [ImageCropperComponent],
    imports: [CommonModule, SharedModule, ImageCropperModule, UiButtonLinkModule, CustomFileUploadModule],
    exports: [ImageCropperComponent]
})
export class CustomImageCropperModule {}
