import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { AvailableMacrosModule } from '@scaleo/feature/shared/available/macros';
import { CustomCheckboxModule, InputModule, TextareaModule } from '@scaleo/shared/components';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import { UiButtonLinkModule, UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { EmailTemplatesEditComponent } from './email-templates-edit.component';

@NgModule({
    declarations: [EmailTemplatesEditComponent],
    imports: [
        CommonModule,
        SharedModule,
        UiSkeletonModule,
        CustomCheckboxModule,
        TextareaModule,
        InputModule,
        AvailableMacrosModule,
        Modal3EditFormModule,
        UiButtonLinkModule
    ],
    exports: [EmailTemplatesEditComponent]
})
export class EmailTemplatesEditModule {}
