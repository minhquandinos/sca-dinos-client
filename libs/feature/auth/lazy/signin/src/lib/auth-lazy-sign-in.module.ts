import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInGuard } from '@scaleo/auth/guards';
import { TwoFaVerificationGuard } from '@scaleo/auth/two-fa-verification/guard';
import { SharedModule } from '@scaleo/core/shared/module';
import { AuthLanguagesComponent, AuthLanguagesModule } from '@scaleo/feature/auth/shared/languages';
import { AuthTermsConditionsComponent, AuthTermsConditionsModule } from '@scaleo/feature/auth/shared/terms-conditions';
import { ErrorsModule, InputModule } from '@scaleo/shared/components';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { PlatformLogoComponent, PlatformLogoModule, PoweredByComponent, PoweredByModule } from '@scaleo/shared/layout/components';
import { UiButtonLinkModule } from '@scaleo/ui-kit/elements';
import { ScaleoLayoutComponent, ScaleoLayoutEnum } from '@scaleo/ui-kit/layout';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmationComponent } from './password-reset-confirmation/password-reset-confirmation.component';

const routes: Routes = [
    {
        path: '',
        component: ScaleoLayoutComponent,
        data: {
            layout: ScaleoLayoutEnum.Auth
        },
        canActivate: [SignInGuard],
        children: [
            {
                path: '',
                component: PlatformLogoComponent,
                outlet: 'logo'
            },
            {
                path: '',
                component: AuthTermsConditionsComponent,
                outlet: 'footer'
            },
            {
                path: '',
                component: AuthLanguagesComponent,
                outlet: 'toolbar-languages'
            },
            {
                path: '',
                component: PoweredByComponent,
                outlet: 'powered-by'
            },
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'password-reset',
                component: PasswordResetComponent
            },
            {
                path: 'password-reset-confirmation/:email',
                component: PasswordResetConfirmationComponent
            },
            {
                path: 'password-change/:passwordResetToken',
                component: ChangePasswordComponent
            },
            {
                path: 'verification',
                canActivate: [TwoFaVerificationGuard],
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/auth/shared/two-fa-verification/page').then((m) => m.TwoFaVerificationModule)
            }
        ]
    }
];

@NgModule({
    declarations: [LoginComponent, ChangePasswordComponent, PasswordResetComponent, PasswordResetConfirmationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        InputModule,
        UiButtonLinkModule,
        ErrorsModule,
        PlatformLogoModule,
        PoweredByModule,
        AuthLanguagesModule,
        AuthTermsConditionsModule,
        DisableButtonDuringRequestDirectiveModule
    ]
})
export class AuthLazySignInModule {}
