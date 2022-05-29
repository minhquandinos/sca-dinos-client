import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiAlertComponent } from './ui-alert.component';

@NgModule({
    declarations: [UiAlertComponent],
    imports: [CommonModule],
    exports: [UiAlertComponent]
})
export class UiAlertModule {}
