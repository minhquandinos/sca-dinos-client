import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';

import { CustomRadioComponent } from './custom-radio.component';

@NgModule({
    declarations: [CustomRadioComponent],
    imports: [CommonModule, ValidationMessage2SharedModule],
    exports: [CustomRadioComponent]
})
export class CustomRadioModule {}
