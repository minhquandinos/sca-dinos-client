import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { DefaultImageModule } from '@scaleo/shared/pipes';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { ManagerChipModule } from '../manager-chip/manager-chip.module';
import { ManagerListComponent } from './manager-list.component';
import { ManagerListTooltipPipe } from './pipes/manager-list-tooltip.pipe';

@NgModule({
    declarations: [ManagerListComponent, ManagerListTooltipPipe],
    exports: [ManagerListComponent],
    imports: [CommonModule, SharedModule, UiSvgIconModule, DefaultImageModule, ManagerChipModule]
})
export class ManagerListModule {}
