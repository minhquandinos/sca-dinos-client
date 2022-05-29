import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Modal3ActionDirective } from './directives/modal-action.directive';
import { Modal3TitleDirective } from './directives/modal3-title.directive';

@NgModule({
    declarations: [Modal3ActionDirective, Modal3TitleDirective],
    imports: [CommonModule],
    exports: [Modal3ActionDirective, Modal3TitleDirective]
})
export class Modal3EditFormModule {}
