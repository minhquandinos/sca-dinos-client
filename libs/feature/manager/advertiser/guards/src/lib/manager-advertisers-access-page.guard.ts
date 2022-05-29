import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Data, Route } from '@angular/router';
import { combineLatest, map, Observable, of, tap } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { ManagerAdvertisersAccessPageService } from '@scaleo/feature/manager/advertiser/services';
import { MANAGER_NAVIGATION_PATH } from '@scaleo/feature/manager/core/navigation';
import { NavigateRootService } from '@scaleo/shared/components';

const redirectUrl = (page: keyof typeof MANAGER_NAVIGATION_PATH.advertisers.list): string => {
    const urlMap: BaseObjectModel<string, string> = {
        [MANAGER_NAVIGATION_PATH.advertisers.list.all.routePath]: MANAGER_NAVIGATION_PATH.advertisers.list.my.absolute,
        [MANAGER_NAVIGATION_PATH.advertisers.list.my.routePath]: MANAGER_NAVIGATION_PATH.advertisers.list.pending.absolute,
        [MANAGER_NAVIGATION_PATH.advertisers.list.pending.routePath]: '/permission-denied'
    };
    return urlMap?.[page];
};

@Injectable()
export class ManagerAdvertisersAccessPageGuard implements CanLoad, CanActivate {
    constructor(
        private readonly navigateRootService: NavigateRootService,
        private readonly accessPage: ManagerAdvertisersAccessPageService
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

    private pageMap(data: Data): Observable<[boolean, keyof typeof MANAGER_NAVIGATION_PATH.advertisers.list]> {
        const page = data?.['page'];
        const page$ = of(page);

        const navigationMap: BaseObjectModel = {
            [MANAGER_NAVIGATION_PATH.advertisers.list.all.routePath]: combineLatest([this.accessPage.showAllPage$, page$]),
            [MANAGER_NAVIGATION_PATH.advertisers.list.my.routePath]: combineLatest([this.accessPage.showMyPage$, page$]),
            [MANAGER_NAVIGATION_PATH.advertisers.list.pending.routePath]: combineLatest([of(true), page$])
        };

        return navigationMap?.[page] || of(false);
    }
}
