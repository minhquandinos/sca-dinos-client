import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { CustomCheckboxModule, CustomFieldModule, InputModule, TagsListModule } from '@scaleo/shared/components';
import { AddContactModule } from '@scaleo/shared/components/contact';
import { FindCountryModule } from '@scaleo/shared/components/find';
import { SelectModule } from '@scaleo/shared/components/select';
import { ScrollFirstInvalidFieldDirectiveModule } from '@scaleo/shared/directives';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';

import { AuthSharedSignupComponent } from './auth-shared-signup.component';
import { InputMaxLengthDirective } from './input-max-length.directive';

@NgModule({
    declarations: [AuthSharedSignupComponent, InputMaxLengthDirective],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        SharedModule,
        FindCountryModule,
        CustomFieldModule,
        AddContactModule,
        InputModule,
        TagsListModule,
        SelectModule,
        UiButtonLinkModule,
        CustomCheckboxModule,
        RouterModule,
        ScrollFirstInvalidFieldDirectiveModule
    ],
    exports: [AuthSharedSignupComponent, InputMaxLengthDirective]
})
export class AuthSharedSignupModule {}
