import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';

import { CustomCheckboxComponent } from './custom-checkbox.component';

@NgModule({
    declarations: [CustomCheckboxComponent],
    imports: [CommonModule, ValidationMessage2SharedModule, SharedModule],
    exports: [CustomCheckboxComponent]
})
export class CustomCheckboxModule {}
