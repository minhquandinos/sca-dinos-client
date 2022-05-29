import { Inject, Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { ProfileQuery } from '@scaleo/account/data-access';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BASE_ROLE } from '@scaleo/platform/role/models';

@Injectable()
export class ManagerAdvertisersAccessPageService {
    readonly showAllPage$: Observable<boolean> = this.profileQuery.baseRole$.pipe(
        switchMap((baseRole) => {
            if (baseRole === BASE_ROLE.manager) {
                return this.checkPermissionService.check$(this.permissions.canAccessAllUsers);
            }

            if (baseRole === BASE_ROLE.advertiserManager) {
                if (this.checkPermissionService.check(this.permissions.canAccessAllUsers)) {
                    return of(true);
                }

                if (this.checkPermissionService.check(this.permissions.canAccessAssignedUsersOnly)) {
                    return of(false);
                }
            }

            return of(true);
        })
    );

    readonly showMyPage$: Observable<boolean> = this.profileQuery.baseRole$.pipe(
        switchMap((baseRole) => {
            if (baseRole === BASE_ROLE.affiliateManager) {
                return of(false);
            }

            return of(true);
        })
    );

    constructor(
        private readonly profileQuery: ProfileQuery,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}
}
