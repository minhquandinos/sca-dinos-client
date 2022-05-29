import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { AuthSharedSignupModule } from '@scaleo/feature/auth/signup/shared/components/signup';
import { CustomFieldModule, ErrorsModule } from '@scaleo/shared/components';
import { AddContactModule } from '@scaleo/shared/components/contact';
import { FindCountryModule } from '@scaleo/shared/components/find';

import { SignupAdvertiserComponent } from './signup-advertiser.component';

const router = [
    {
        path: '',
        component: SignupAdvertiserComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(router),
        SharedModule,
        CustomFieldModule,
        AddContactModule,
        FindCountryModule,
        AuthSharedSignupModule,
        ErrorsModule
    ],
    declarations: [SignupAdvertiserComponent],
    exports: [SignupAdvertiserComponent]
})
export class AuthSignupAdvertiserModule {}
