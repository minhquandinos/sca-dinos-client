import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UiSpinnerModule } from '@scaleo/ui-kit/elements';

import { ApiLoginComponent } from './api-login.component';

const routes: Routes = [
    {
        path: '',
        component: ApiLoginComponent
    }
];

@NgModule({
    declarations: [ApiLoginComponent],
    imports: [CommonModule, RouterModule.forChild(routes), UiSpinnerModule]
})
export class FeatureAuthLazySignInApiModule {}
