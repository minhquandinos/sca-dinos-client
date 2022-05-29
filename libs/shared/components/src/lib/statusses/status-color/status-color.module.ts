import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StatusColorComponent } from './status-color.component';

@NgModule({
    declarations: [StatusColorComponent],
    imports: [CommonModule],
    exports: [StatusColorComponent]
})
export class StatusColorModule {}
