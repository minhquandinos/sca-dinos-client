import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { UiStatusDotComponent } from './ui-status-dot.component';

@NgModule({
    declarations: [UiStatusDotComponent],
    exports: [UiStatusDotComponent],
    imports: [CommonModule, SharedModule]
})
export class UiStatusDotModule {}
