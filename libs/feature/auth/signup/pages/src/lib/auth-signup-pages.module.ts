import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AuthSignupPagesRoutingModule } from './auth-signup-pages-routing.module';
import { SignupVariantComponent } from './components/signup-variant/signup-variant.component';

@NgModule({
    declarations: [SignupVariantComponent],
    imports: [CommonModule, AuthSignupPagesRoutingModule, SharedModule, UiButtonLinkModule]
})
export class AuthSignupPagesModule {}
