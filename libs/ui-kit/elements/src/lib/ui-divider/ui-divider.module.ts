import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiDividerComponent } from './ui-divider.component';

@NgModule({
    declarations: [UiDividerComponent],
    imports: [CommonModule],
    exports: [UiDividerComponent]
})
export class UiDividerModule {}
