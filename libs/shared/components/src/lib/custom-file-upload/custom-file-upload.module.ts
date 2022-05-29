import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { CustomFileUploadComponent } from './custom-file-upload.component';

@NgModule({
    declarations: [CustomFileUploadComponent],
    imports: [CommonModule, ValidationMessage2SharedModule, SharedModule, UiButtonLinkModule],
    exports: [CustomFileUploadComponent]
})
export class CustomFileUploadModule {}
