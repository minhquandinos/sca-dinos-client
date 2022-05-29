import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FilledLineComponent } from './filled-line.component';

@NgModule({
    declarations: [FilledLineComponent],
    exports: [FilledLineComponent],
    imports: [CommonModule]
})
export class FilledLineModule {}
