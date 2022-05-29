import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupGuard } from '@scaleo/auth/guards';
import { TwoFaVerificationGuard } from '@scaleo/auth/two-fa-verification/guard';
import { AuthLanguagesComponent, AuthLanguagesModule } from '@scaleo/feature/auth/shared/languages';
import { AuthTermsConditionsComponent, AuthTermsConditionsModule } from '@scaleo/feature/auth/shared/terms-conditions';
import { PlatformLogoComponent, PlatformLogoModule, PoweredByComponent, PoweredByModule } from '@scaleo/shared/layout/components';
import { ScaleoLayoutComponent, ScaleoLayoutEnum } from '@scaleo/ui-kit/layout';

import { SignupVariantComponent } from './components/signup-variant/signup-variant.component';

const routes: Routes = [
    {
        path: '',
        component: ScaleoLayoutComponent,
        data: {
            layout: ScaleoLayoutEnum.Auth
        },
        canActivate: [SignupGuard],
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
                component: SignupVariantComponent
            },
            {
                path: 'advertiser',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/auth/signup/advertiser/page').then((m) => m.AuthSignupAdvertiserModule)
            },
            {
                path: 'affiliate',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/auth/signup/affiliate/page').then((m) => m.AuthSignupAffiliateModule)
            },
            {
                path: 'verify-email',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/auth/signup/verify-email/page').then((m) => m.SignupEmailVerificationInfoModule)
            },
            {
                path: 'approval-required',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/auth/signup/approval-required/page').then((m) => m.SignupApprovalRequiredModule)
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
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PlatformLogoModule,
        PoweredByModule,
        AuthLanguagesModule,
        AuthTermsConditionsModule
    ],
    exports: [RouterModule]
})
export class AuthSignupPagesRoutingModule {}
