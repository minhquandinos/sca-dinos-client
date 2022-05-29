import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FieldTextInfoModule } from '../field-text-info';
import { DisplayManagerReferrerLinkToSignUpDirective } from './directives/display-manager-referrer-link-to-sign-up.directive';
import { ManagerReferrerLinkToSignUpComponent } from './manager-referrer-link-to-sign-up.component';

@NgModule({
    declarations: [ManagerReferrerLinkToSignUpComponent, DisplayManagerReferrerLinkToSignUpDirective],
    imports: [CommonModule, FieldTextInfoModule],
    exports: [ManagerReferrerLinkToSignUpComponent, DisplayManagerReferrerLinkToSignUpDirective]
})
export class ManagerReferrerLinkToSignUpModule {}
