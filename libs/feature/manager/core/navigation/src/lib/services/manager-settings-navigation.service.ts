import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationPathResolverParams, NavigationPathResolverQueryParams } from '@scaleo/core/navigation/common';

import { MANAGER_NAVIGATION_PATH } from '../manager-navigation';

export type DetailParams = NavigationPathResolverParams<{ id: number | string }> &
    NavigationPathResolverQueryParams<{ affiliateId: number | string; lang: string }>;

@Injectable()
export class ManagerSettingsNavigationService {
    private readonly _path = MANAGER_NAVIGATION_PATH.settings;

    constructor(private router: Router) {}

    general(): string {
        return this.router.createUrlTree([this._path.general.absolute]).toString();
    }

    branding(): string {
        return this._path.branding.absolute;
    }

    affiliatesGeneral(): string {
        return this._path.affiliate.general.absolute;
    }

    affiliatesSignUp(): string {
        return this._path.affiliate.signUp.absolute;
    }
}
