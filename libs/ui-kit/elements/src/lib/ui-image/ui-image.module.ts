import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiStatusColorModule } from '../ui-status-color/ui-status-color.module';
import { UiImageComponent } from './ui-image.component';

@NgModule({
    declarations: [UiImageComponent],
    exports: [UiImageComponent],
    imports: [CommonModule, UiStatusColorModule]
})
export class UiImageModule {}
