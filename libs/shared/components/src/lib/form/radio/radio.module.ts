import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';

import { CustomInfoTooltipModule } from '../../custom-info-tooltip/custom-info-tooltip.module';
import { RadioComponent } from './radio.component';
import { RadioGroupComponent } from './radio-group.component';

@NgModule({
    declarations: [RadioComponent, RadioGroupComponent],
    imports: [CommonModule, ValidationMessage2SharedModule, CustomInfoTooltipModule],
    exports: [RadioComponent, RadioGroupComponent]
})
export class RadioModule {}
