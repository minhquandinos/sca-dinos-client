import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { AuthSharedSignupModule } from '@scaleo/feature/auth/signup/shared/components/signup';
import { CustomFieldModule, ErrorsModule } from '@scaleo/shared/components';
import { AddContactModule } from '@scaleo/shared/components/contact';
import { FindCountryModule } from '@scaleo/shared/components/find';

import { SignupAffiliateComponent } from './signup-affiliate.component';

const router = [
    {
        path: '',
        component: SignupAffiliateComponent
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
    declarations: [SignupAffiliateComponent],
    exports: [SignupAffiliateComponent]
})
export class AuthSignupAffiliateModule {}
