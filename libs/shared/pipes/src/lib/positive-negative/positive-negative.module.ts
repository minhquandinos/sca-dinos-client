import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PositiveNegativePipe } from './positive-negative.pipe';

@NgModule({
    declarations: [PositiveNegativePipe],
    imports: [CommonModule],
    exports: [PositiveNegativePipe]
})
export class PositiveNegativeModule {}
