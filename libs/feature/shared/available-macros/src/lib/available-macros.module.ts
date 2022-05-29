import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@scaleo/core/shared/module';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiChipModule } from '@scaleo/ui-kit/elements';

import { AvailableMacrosComponent } from './available-macros.component';

@NgModule({
    declarations: [AvailableMacrosComponent],
    imports: [CommonModule, FormsModule, SharedModule, UiChipModule, FieldTextInfoModule, UiButtonLinkModule],
    exports: [CommonModule, AvailableMacrosComponent]
})
export class AvailableMacrosModule {}
