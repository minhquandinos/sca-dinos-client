import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiSkeletonModule } from '@scaleo/ui-kit/elements';

import { EmailVerificationInfoComponent } from './email-verification-info.component';

const router = [
    {
        path: '',
        component: EmailVerificationInfoComponent
    },
    {
        path: ':token',
        component: EmailVerificationInfoComponent
    }
];

@NgModule({
    declarations: [EmailVerificationInfoComponent],
    imports: [CommonModule, RouterModule.forChild(router), SharedModule, UiSkeletonModule],
    exports: [EmailVerificationInfoComponent]
})
export class SignupEmailVerificationInfoModule {}
