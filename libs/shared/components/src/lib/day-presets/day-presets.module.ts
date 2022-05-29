import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DayPresetsComponent } from './day-presets.component';

@NgModule({
    declarations: [DayPresetsComponent],
    imports: [CommonModule],
    exports: [DayPresetsComponent]
})
export class DayPresetsModule {}
