import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSvgIconModule } from '../ui-svg-icon';
import { UiButtonLinkComponent } from './ui-button-link.component';

@NgModule({
    declarations: [UiButtonLinkComponent],
    exports: [UiButtonLinkComponent],
    imports: [CommonModule, UiSvgIconModule]
})
export class UiButtonLinkModule {}
