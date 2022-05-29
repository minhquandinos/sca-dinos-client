import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { SelectModule } from '@scaleo/shared/components/select';
import { CustomTranslatePipeModule } from '@scaleo/shared/pipes';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AddParametersComponent } from './add-parameters.component';

@NgModule({
    declarations: [AddParametersComponent],
    exports: [AddParametersComponent],
    imports: [CommonModule, SharedModule, SelectModule, InputModule, UiSvgIconModule, UiButtonLinkModule, CustomTranslatePipeModule]
})
export class AddParametersModule {}
