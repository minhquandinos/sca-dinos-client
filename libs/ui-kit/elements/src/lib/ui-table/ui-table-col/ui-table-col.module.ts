import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiTableColComponent } from './ui-table-col.component';

@NgModule({
    declarations: [UiTableColComponent],
    imports: [CommonModule],
    exports: [UiTableColComponent]
})
export class UiTableColModule {}
