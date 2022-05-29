import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BooleanLabelComponent } from './boolean-label.component';

@NgModule({
    declarations: [BooleanLabelComponent],
    imports: [CommonModule],
    exports: [BooleanLabelComponent]
})
export class BooleanLabelModule {}
