import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StopPropagationDirective } from './stop-propagation.directive';

@NgModule({
    declarations: [StopPropagationDirective],
    imports: [CommonModule],
    exports: [StopPropagationDirective]
})
export class StopPropagationDirectiveModule {}
