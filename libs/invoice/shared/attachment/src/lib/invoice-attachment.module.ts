import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomFileUploadModule } from '@scaleo/shared/components';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { InvoiceAttachmentComponent } from './invoice-attachment.component';

@NgModule({
    declarations: [InvoiceAttachmentComponent],
    imports: [CommonModule, UiSvgIconModule, CustomFileUploadModule, SharedModule],
    exports: [InvoiceAttachmentComponent]
})
export class InvoiceAttachmentModule {}
