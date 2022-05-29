import { Inject, Injectable } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';
import { PathFileService } from '@scaleo/shared/services/path-file';

@Injectable()
export class DefaultManagerService {
    constructor(
        private readonly profileQuery: ProfileQuery,
        private readonly checkPermissionService: CheckPermissionService,
        private readonly pathFileService: PathFileService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}

    get id(): number | undefined {
        let manager: number = undefined;
        const { id, baseRole } = this.profileQuery;
        const baseManagerRole = [BASE_ROLE.affiliateManager, BASE_ROLE.advertiserManager] as BaseRoleType[];
        const advertiserAffiliateRole = [BASE_ROLE.affiliate, BASE_ROLE.advertiser] as BaseRoleType[];

        if (
            advertiserAffiliateRole.includes(baseRole) ||
            (!this.checkPermissionService.check(this.permissions.canAccessTeammates) && baseManagerRole.includes(baseRole))
        ) {
            manager = id;
        }

        return manager;
    }
}
