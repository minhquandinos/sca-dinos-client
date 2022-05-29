import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPagesComponent } from './auth-pages.component';

const routes: Routes = [
    {
        path: '',
        component: AuthPagesComponent,
        children: [
            /**
             * Ui login
             */
            {
                path: 'login',
                loadChildren: () => import('@scaleo/feature/auth/lazy/signin').then((m) => m.AuthLazySignInModule)
                // canActivate: [SignInGuard],
            },

            /**
             * Login to platform from api
             */
            {
                path: 'login-api',
                loadChildren: () => import('@scaleo/feature/auth/lazy/signin-api').then((m) => m.FeatureAuthLazySignInApiModule)
            },

            /**
             * Switch account from to child or parent role
             */
            {
                path: 'login-as',
                loadChildren: () => import('@scaleo/feature/auth/lazy/switch-role').then((m) => m.AuthSwitchRoleModule)
            },

            /**
             * Logout
             */
            {
                path: 'logout',
                loadChildren: () => import('@scaleo/feature/auth/lazy/logout').then((m) => m.AuthLogoutModule)
            },

            /**
             * Ui Sign Up
             */
            {
                path: 'signup',
                loadChildren: () => import('@scaleo/feature/auth/signup/pages').then((m) => m.AuthSignupPagesModule)
                // canActivate: [RegisterGuard],
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthPagesRoutingModule {}
