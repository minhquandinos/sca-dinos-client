import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'auth-signup',
    templateUrl: './signup-variant.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupVariantComponent implements OnInit {
    constructor(public router: Router, private platformSettingsQuery: PlatformSettingsQuery) {}

    ngOnInit(): void {
        this.redirectToRegistratioPage();
    }

    routeSignUp(route: string): void {
        this.router.navigate([`auth/${route}`]);
    }

    redirectToRegistratioPage(): void {
        if (
            !this.platformSettingsQuery.settings.adv_allow_advertiser_signup &&
            !this.platformSettingsQuery.settings.aff_allow_affiliate_signup
        ) {
            this.router.navigate(['/login']);
        }

        if (
            !this.platformSettingsQuery.settings.adv_allow_advertiser_signup &&
            this.platformSettingsQuery.settings.aff_allow_affiliate_signup
        ) {
            this.router.navigate(['/auth/signup-affiliate']);
        }

        if (
            this.platformSettingsQuery.settings.adv_allow_advertiser_signup &&
            !this.platformSettingsQuery.settings.aff_allow_affiliate_signup
        ) {
            this.router.navigate(['/auth/signup-advertiser']);
        }
    }
}
