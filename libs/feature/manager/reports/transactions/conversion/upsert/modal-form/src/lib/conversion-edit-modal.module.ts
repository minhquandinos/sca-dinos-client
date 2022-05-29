import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { ConversionEditModalComponent } from './conversion-edit-modal.component';

@NgModule({
    declarations: [ConversionEditModalComponent],
    imports: [CommonModule, InputModule, SharedModule, UiButtonLinkModule, Modal3EditFormModule],
    exports: [ConversionEditModalComponent]
})
export class ConversionEditModalModule {}
