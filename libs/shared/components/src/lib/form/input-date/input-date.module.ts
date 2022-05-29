import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';

import { CustomDateRangeModule } from '../../custom-date-range/custom-date-range.module';
import { InputDateComponent } from './input-date.component';

@NgModule({
    declarations: [InputDateComponent],
    imports: [CommonModule, CustomDateRangeModule, ValidationMessage2SharedModule],
    exports: [InputDateComponent]
})
export class InputDateModule {}
