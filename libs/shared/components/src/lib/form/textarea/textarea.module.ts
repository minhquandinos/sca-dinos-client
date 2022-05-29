import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutosizeModule } from 'ngx-autosize';

import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';

import { TextareaValuePatternDirective } from './directives/textarea-value-pattern.directive';
import { TextareaComponent } from './textarea.component';

@NgModule({
    declarations: [TextareaComponent, TextareaValuePatternDirective],
    imports: [CommonModule, AutosizeModule, ValidationMessage2SharedModule],
    exports: [TextareaComponent, TextareaValuePatternDirective]
})
export class TextareaModule {}
