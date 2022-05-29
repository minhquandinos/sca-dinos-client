import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Injectable({ providedIn: 'root' })
export class SignupGuard implements CanActivate {
    constructor(private router: Router, private platformSettingsQuery: PlatformSettingsQuery) {}

    /**
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const allowSignupAdv = this.platformSettingsQuery.settings.adv_allow_advertiser_signup;

        if (!allowSignupAdv && state.url === '/signup/advertiser') {
            this.router.navigate(['/login']);
            return false;
        }

        const allowSignupAff = this.platformSettingsQuery.settings.aff_allow_affiliate_signup;
        if (!allowSignupAff && state.url === '/signup/affiliate') {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
