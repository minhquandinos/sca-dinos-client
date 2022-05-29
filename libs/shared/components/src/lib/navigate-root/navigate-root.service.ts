import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';

import { NavigateRootQueryParamsType } from './navigate-root.model';

@Injectable({
    providedIn: 'root'
})
export class NavigateRootService {
    constructor(private profile: ProfileQuery, private router: Router) {}

    private static removeDoubleSlash(url: string): string {
        return url.replace(/\/\//g, '/');
    }

    navigate(url: string, queryParams: NavigateRootQueryParamsType = {}, absolutePath: boolean = true): void {
        this.router.navigate([this.path(url, absolutePath)], { queryParams });
    }

    path(path: string, absolutePath: boolean = true): string {
        const { slug } = this.profile;
        if (this.profile.role && absolutePath) {
            let fullPath = `/manager/${path}`;
            if (([BASE_ROLE.advertiser, BASE_ROLE.affiliate] as BaseRoleType[]).includes(this.profile.baseRole)) {
                fullPath = `/${slug}/${path}`;
            }

            return NavigateRootService.removeDoubleSlash(fullPath);
        }
        return path;
    }
}
