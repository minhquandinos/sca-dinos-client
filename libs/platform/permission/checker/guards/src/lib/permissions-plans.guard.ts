import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';

import { CheckPermissionService } from '@scaleo/platform/permission/role';
import { PlanFeatureService } from '@scaleo/platform-permission-plan-service';
import { NavigateRootService } from '@scaleo/shared/components';

type NextPageType =
    | {
          path: string;
          rootPath?: boolean;
      }
    | string;

type CheckType = 'some' | 'every';

export interface PermissionsPlansDataModel {
    only: string[];
    canLoadCheckType?: CheckType;
    canActivateCheckType?: CheckType;
    nextPage: NextPageType;
    deniedPage: string;
}

@Injectable({
    providedIn: 'root'
})
export class PermissionsPlansGuard implements CanActivate, CanLoad {
    constructor(
        private readonly checkPermissionService: CheckPermissionService,
        private readonly planFeatureService: PlanFeatureService,
        private router: Router,
        private readonly navigateRootService: NavigateRootService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        const {
            only = [],
            canActivateCheckType = undefined,
            nextPage = undefined,
            deniedPage = undefined
        }: PermissionsPlansDataModel = route.data?.['permissions'] || {};
        return firstValueFrom(
            this.checkPermissionService.check$(only, canActivateCheckType).pipe(
                tap((status) => {
                    if (!status) {
                        this.navigateToPage(nextPage, deniedPage);
                    }
                })
            )
        );
    }

    canLoad(route: Route): Promise<boolean> {
        const {
            only = [],
            canLoadCheckType = undefined,
            nextPage = undefined,
            deniedPage = undefined
        }: PermissionsPlansDataModel = route.data?.['permissions'] || {};
        return firstValueFrom(
            this.checkPermissionService.check$(only, canLoadCheckType).pipe(
                tap((status) => {
                    if (!status) {
                        this.navigateToPage(nextPage, deniedPage);
                    }
                })
            )
        );
    }

    private navigateToPage(nextPage: NextPageType, deniedPage: string): void {
        if (typeof nextPage === 'object' || typeof nextPage === 'string') {
            if (typeof nextPage === 'object') {
                const path = nextPage.rootPath ? this.navigateRootService.path(nextPage.path) : nextPage.path;
                this.router.navigateByUrl(path);
            }

            if (typeof nextPage === 'string') {
                this.router.navigateByUrl(nextPage);
            }
        } else if (deniedPage) {
            this.router.navigateByUrl(deniedPage);
        }
    }
}
