import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';
import { CustomTranslatePipeModule } from '@scaleo/shared/pipes';

import { SignupProcessSelectComponent } from './signup-process-select.component';

@NgModule({
    declarations: [SignupProcessSelectComponent],
    imports: [CommonModule, SelectModule, SharedModule, CustomTranslatePipeModule],
    exports: [SignupProcessSelectComponent]
})
export class ManagerSettingsSignupProcessSelectModule {}
