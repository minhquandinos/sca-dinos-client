import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Modal3InfoActionDirective } from './modal3-info-action.directive';

@NgModule({
    declarations: [Modal3InfoActionDirective],
    imports: [CommonModule],
    exports: [Modal3InfoActionDirective]
})
export class Modal3InfoModule {}
