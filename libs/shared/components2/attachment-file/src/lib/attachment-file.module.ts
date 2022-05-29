import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomFileUploadModule } from '@scaleo/shared/components';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AttachmentFileComponent } from './attachment-file.component';

const publicEntities = [AttachmentFileComponent];

@NgModule({
    declarations: [...publicEntities],
    imports: [CommonModule, CustomFileUploadModule, SharedModule, UiSvgIconModule],
    exports: [...publicEntities]
})
export class AttachmentFileModule {}
