import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSvgIconModule } from '../ui-svg-icon';
import { UiChipComponent } from './ui-chip.component';

@NgModule({
    declarations: [UiChipComponent],
    exports: [UiChipComponent],
    imports: [CommonModule, UiSvgIconModule]
})
export class UiChipModule {}
