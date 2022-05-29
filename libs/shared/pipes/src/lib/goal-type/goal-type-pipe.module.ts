import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GoalTypeColorPipe } from './goal-type-color.pipe';
import { GoalTypeNamePipe } from './goal-type-name.pipe';

@NgModule({
    declarations: [GoalTypeColorPipe, GoalTypeNamePipe],
    imports: [CommonModule],
    exports: [GoalTypeColorPipe, GoalTypeNamePipe]
})
export class GoalTypePipeModule {}
