import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiButtonGroupComponent } from './ui-button-group.component';

@NgModule({
    declarations: [UiButtonGroupComponent],
    imports: [CommonModule],
    exports: [UiButtonGroupComponent]
})
export class UiButtonGroupModule {}
