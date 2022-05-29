import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Data, Route } from '@angular/router';
import { combineLatest, map, Observable, of, tap } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { MANAGER_AFFILIATE_NAVIGATE, ManagerAffiliateNavigateType } from '@scaleo/feature/manager/affiliate/common';
import { ManagerAffiliatesAccessPageService } from '@scaleo/feature/manager/affiliate/services';
import { NavigateRootService } from '@scaleo/shared/components';

const redirectUrl = (page: ManagerAffiliateNavigateType): string => {
    const urlMap: BaseObjectModel<string, string> = {
        [MANAGER_AFFILIATE_NAVIGATE.all]: '/affiliates/my',
        [MANAGER_AFFILIATE_NAVIGATE.my]: '/affiliates/pending',
        [MANAGER_AFFILIATE_NAVIGATE.pending]: '/permission-denied'
    };
    return urlMap?.[page];
};

@Injectable()
export class ManagerAffiliateAccessPageGuard implements CanLoad, CanActivate {
    constructor(
        private readonly navigateRootService: NavigateRootService,
        private readonly accessPage: ManagerAffiliatesAccessPageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.access(route.data);
    }

    canLoad(route: Route): Observable<boolean> {
        return this.access(route.data);
    }

    private access(data: Data): Observable<boolean> {
        return this.pageMap(data).pipe(
            tap(([access, page]) => {
                if (!access) {
                    const redirect = redirectUrl(page);
                    if (redirect) {
                        this.navigateRootService.navigate(redirect);
                    }
                }
            }),
            map(([access]) => access)
        );
    }

    private pageMap(data: Data): Observable<[boolean, ManagerAffiliateNavigateType]> {
        const page = data?.['page'];
        const page$ = of(page);

        const navigationMap: BaseObjectModel = {
            [MANAGER_AFFILIATE_NAVIGATE.all]: combineLatest([this.accessPage.showAllPage$, page$]),
            [MANAGER_AFFILIATE_NAVIGATE.my]: combineLatest([this.accessPage.showMyPage$, page$]),
            [MANAGER_AFFILIATE_NAVIGATE.pending]: combineLatest([of(true), page$])
        };

        return navigationMap?.[page] || of(false);
    }
}
