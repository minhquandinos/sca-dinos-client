import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiSwitchModule } from 'ngx-ui-switch';

import { ValidationMessage2SharedModule } from '@scaleo/shared/components/validation-message2';

import { CustomSwitchComponent } from './custom-switch.component';

@NgModule({
    declarations: [CustomSwitchComponent],
    imports: [CommonModule, UiSwitchModule, ValidationMessage2SharedModule],
    exports: [CustomSwitchComponent]
})
export class CustomSwitchModule {}
