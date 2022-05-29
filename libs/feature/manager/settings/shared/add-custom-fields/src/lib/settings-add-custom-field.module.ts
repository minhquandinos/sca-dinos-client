import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomCheckboxModule, InputModule } from '@scaleo/shared/components';
import { UiButtonLinkModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { SelectModule } from '../../../../../../../shared/components/select/src/lib/select.module';
import { SettingsAddCustomFieldComponent } from './settings-add-custom-field.component';

@NgModule({
    declarations: [SettingsAddCustomFieldComponent],
    imports: [CommonModule, SharedModule, SelectModule, CustomCheckboxModule, UiSvgIconModule, UiButtonLinkModule, InputModule],
    exports: [SettingsAddCustomFieldComponent]
})
export class SettingsAddCustomFieldModule {}
