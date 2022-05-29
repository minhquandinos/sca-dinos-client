import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Injectable({
    providedIn: 'root'
})
export class MobileAppToolGuard implements CanActivate {
    constructor(
        private readonly profileQuery: ProfileQuery,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly router: Router
    ) {}

    canActivate(): boolean {
        const { show_mobile_advertisers, show_mobile_affiliates, show_mobile_managers, mobile_app } = this.platformSettingsQuery.settings;
        const showMobilePropByRoleMap: BaseObjectModel = {
            [DefaultRoleEnum.AffiliateManager]: show_mobile_affiliates,
            [DefaultRoleEnum.AdvertiserManager]: show_mobile_advertisers
        };
        const canActivate = !!mobile_app && !!(showMobilePropByRoleMap[this.profileQuery.role] || show_mobile_managers);
        if (!canActivate) {
            this.router.navigate(['/permission-denied']);
        }
        return canActivate;
    }
}
