import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';

import { SignupApprovalRequiredComponent } from './signup-approval-required.component';

const routes: Routes = [
    {
        path: '',
        component: SignupApprovalRequiredComponent
    }
];

@NgModule({
    declarations: [SignupApprovalRequiredComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class SignupApprovalRequiredModule {}
