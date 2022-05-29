import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DefaultImageModule } from '@scaleo/shared/pipes';
import { UiChipModule, UiImageModule } from '@scaleo/ui-kit/elements';

import { ManagerChipComponent } from './manager-chip.component';

@NgModule({
    declarations: [ManagerChipComponent],
    imports: [CommonModule, UiChipModule, UiImageModule, DefaultImageModule],
    exports: [ManagerChipComponent]
})
export class ManagerChipModule {}
