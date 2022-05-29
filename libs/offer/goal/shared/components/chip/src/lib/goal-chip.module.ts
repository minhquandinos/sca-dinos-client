import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiChipModule } from '@scaleo/ui-kit/elements';

import { GoalChipComponent } from './goal-chip.component';

@NgModule({
    declarations: [GoalChipComponent],
    imports: [CommonModule, UiChipModule],
    exports: [GoalChipComponent]
})
export class GoalChipModule {}
