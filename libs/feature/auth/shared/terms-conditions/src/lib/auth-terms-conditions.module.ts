import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { AuthTermsConditionsComponent } from './auth-terms-conditions.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [AuthTermsConditionsComponent],
    exports: [AuthTermsConditionsComponent]
})
export class AuthTermsConditionsModule {}
