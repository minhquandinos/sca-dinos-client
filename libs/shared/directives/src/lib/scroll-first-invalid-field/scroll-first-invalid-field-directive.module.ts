import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollFirstInvalidFieldDirective } from './scroll-first-invalid-field.directive';

@NgModule({
    declarations: [ScrollFirstInvalidFieldDirective],
    imports: [CommonModule],
    exports: [ScrollFirstInvalidFieldDirective]
})
export class ScrollFirstInvalidFieldDirectiveModule {}
