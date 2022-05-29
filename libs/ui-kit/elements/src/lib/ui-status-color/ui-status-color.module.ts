import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { UiStatusColorComponent } from './ui-status-color.component';

@NgModule({
    declarations: [UiStatusColorComponent],
    exports: [UiStatusColorComponent],
    imports: [CommonModule, SharedModule]
})
export class UiStatusColorModule {}
