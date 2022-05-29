import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '@scaleo/core/shared/module';
import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';
import { UiChipModule } from '@scaleo/ui-kit/elements';

import { SelectComponent } from './select.component';

@NgModule({
    declarations: [SelectComponent],
    exports: [SelectComponent, NgSelectModule],
    imports: [CommonModule, NgSelectModule, SharedModule, ValidationMessage2SharedModule, UiChipModule]
})
export class SelectModule {}
