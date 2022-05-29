import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSpinnerComponent } from './ui-spinner.component';

@NgModule({
    declarations: [UiSpinnerComponent],
    imports: [CommonModule],
    exports: [UiSpinnerComponent]
})
export class UiSpinnerModule {}
