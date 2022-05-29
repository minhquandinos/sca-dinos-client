import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiPageWrapperModule } from '../ui-page-wrapper/index';
import { CardComponent } from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [CommonModule, UiPageWrapperModule],
    exports: [CardComponent]
})
export class CardModule {}
