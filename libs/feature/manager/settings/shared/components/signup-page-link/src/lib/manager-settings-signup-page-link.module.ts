import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { FieldTextInfoModule } from '@scaleo/shared/components';
import { UiBrModule } from '@scaleo/ui-kit/elements';

import { SignupPageLinkComponent } from './signup-page-link.component';

@NgModule({
    declarations: [SignupPageLinkComponent],
    exports: [SignupPageLinkComponent],
    imports: [CommonModule, UiBrModule, SharedModule, FieldTextInfoModule]
})
export class ManagerSettingsSignupPageLinkModule {}
