import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { IsTruthyModule } from '@scaleo/shared/pipes';
import { UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { CustomSwitchModule } from '../custom-switch/custom-switch.module';
import { FieldTextInfoModule } from '../field-text-info/field-text-info.module';
import { ApiAccessComponent } from './api-access.component';

@NgModule({
    declarations: [ApiAccessComponent],
    imports: [CommonModule, FieldTextInfoModule, UiSvgIconModule, SharedModule, CustomSwitchModule, IsTruthyModule],
    exports: [ApiAccessComponent]
})
export class ApiAccessModule {}
