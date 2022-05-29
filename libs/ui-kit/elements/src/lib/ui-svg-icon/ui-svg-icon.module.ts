import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSvgIconComponent } from './ui-svg-icon.component';

@NgModule({
    declarations: [UiSvgIconComponent],
    exports: [UiSvgIconComponent],
    imports: [CommonModule]
})
export class UiSvgIconModule {}
