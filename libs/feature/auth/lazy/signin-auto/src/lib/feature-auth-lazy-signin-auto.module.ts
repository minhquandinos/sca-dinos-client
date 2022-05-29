import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiSpinnerModule } from '@scaleo/ui-kit/elements';

import { AuthSignInAutoComponent } from './auth-sign-in-auto.component';

@NgModule({
    imports: [CommonModule, UiSpinnerModule],
    declarations: [AuthSignInAutoComponent]
})
export class FeatureAuthLazySigninAutoModule {}
