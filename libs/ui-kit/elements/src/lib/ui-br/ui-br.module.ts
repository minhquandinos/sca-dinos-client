import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiBrComponent } from './ui-br.component';

@NgModule({
    declarations: [UiBrComponent],
    exports: [UiBrComponent],
    imports: [CommonModule]
})
export class UiBrModule {}
