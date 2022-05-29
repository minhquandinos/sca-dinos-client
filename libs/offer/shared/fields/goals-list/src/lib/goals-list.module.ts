import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomInfoModule, ShortListColumnModule } from '@scaleo/shared/components';
import { UiChipModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { GoalsListComponent } from './goals-list.component';
import { GoalListValuePipe } from './goal-list-value.pipe';

@NgModule({
    declarations: [GoalsListComponent, GoalListValuePipe],
    exports: [GoalsListComponent],
    imports: [CommonModule, UiChipModule, CustomInfoModule, SharedModule, UiSvgIconModule, ShortListColumnModule, PlatformFormatPipeModule]
})
export class GoalsListModule {}
