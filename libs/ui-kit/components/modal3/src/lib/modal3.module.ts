import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule, UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { ModalEditFormComponent } from './components/modal-edit-form.component';
import { Modal3ConfirmComponent } from './components/modal3-confirm.component';
import { Modal3InfoComponent } from './components/modal3-info.component';
import { Modal3EditFormModule } from './containers/modal3-edit-form/modal3-edit-form.module';
import { Modal3Service } from './services/modal3.service';

@NgModule({
    declarations: [Modal3ConfirmComponent, ModalEditFormComponent, Modal3InfoComponent],
    imports: [CommonModule, OverlayModule, UiPageWrapperModule, UiButtonLinkModule, SharedModule, Modal3EditFormModule]
})
export class Modal3Module {
    static forRoot(): ModuleWithProviders<Modal3Module> {
        return {
            ngModule: Modal3Module,
            providers: [Modal3Service]
        };
    }
}
