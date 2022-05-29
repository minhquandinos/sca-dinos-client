import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { CustomCheckboxModule } from '../custom-checkbox/custom-checkbox.module';
import { InputModule } from '../input/input.module';
import { TextareaModule } from '../textarea';
import { CustomFieldComponent } from './custom-field.component';

@NgModule({
    declarations: [CustomFieldComponent],
    imports: [CommonModule, SharedModule, InputModule, TextareaModule, CustomCheckboxModule],
    exports: [CustomFieldComponent]
})
export class CustomFieldModule {}
