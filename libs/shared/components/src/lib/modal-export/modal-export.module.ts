import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { UiButtonLinkModule } from '../../../../../ui-kit/elements/src/lib/ui-button-link/ui-button-link.module';
import { RadioModule } from '../form/radio/radio.module';
import { ModalExportComponent } from './modal-export.component';
import { ModalExportFileFormatLabelPipe } from './pipes/modal-export-file-format-label.pipe';

@NgModule({
    declarations: [ModalExportComponent, ModalExportFileFormatLabelPipe],
    exports: [ModalExportComponent],
    imports: [CommonModule, UiButtonLinkModule, SharedModule, RadioModule]
})
export class ModalExportModule {}
