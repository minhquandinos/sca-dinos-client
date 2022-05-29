import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@scaleo/auth/authentication/service';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { NavigateRootService } from '@scaleo/shared/components';

@Injectable({
    providedIn: 'root'
})
export class SignInGuard implements CanActivate {
    constructor(
        private settingsQuery: PlatformSettingsQuery,
        @Inject(DOCUMENT) private document: Document,
        private authenticationService: AuthenticationService,
        private router: Router,
        private navigateRootService: NavigateRootService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.settingsQuery?.settings?.login_custom_url) {
            this.document.location.href = this.settingsQuery?.settings?.login_custom_url;
            return false;
        }

        const currentUser = this.authenticationService.userCredentials;
        if (currentUser && this.authenticationService.isAuthenticated()) {
            this.router.navigate([this.navigateRootService.path('dashboard')], {
                queryParams: { returnUrl: state.url }
            });
            return false;
        }

        return true;
    }
}
