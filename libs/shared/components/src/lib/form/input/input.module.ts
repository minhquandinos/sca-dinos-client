import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';
import { UiTooltipModule } from '@scaleo/ui-kit/elements/tooltip';

import { InputValuePatternDirective } from './directives/input-value-pattern.directive';
import { InputComponent } from './input.component';

@NgModule({
    declarations: [InputComponent, InputValuePatternDirective],
    exports: [InputComponent, InputValuePatternDirective],
    imports: [CommonModule, ValidationMessage2SharedModule, UiSvgIconModule, UiTooltipModule]
})
export class InputModule {}
