import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

import { ProfileQuery } from '@scaleo/account/data-access';

export class RolePermission {
    constructor(
        private profileQuery: ProfileQuery,
        private ngxRolesService: NgxRolesService,
        private ngxPermissionsService: NgxPermissionsService
    ) {}

    set(): void {
        this.clear();
        this.addRoleAndPermission();
    }

    private clear(): void {
        if (!this.ngxPermissionsService.getPermissions()) {
            this.ngxPermissionsService.flushPermissions();
        }
        if (!this.ngxRolesService.getRoles()) {
            this.ngxRolesService.flushRoles();
        }
    }

    private addRoleAndPermission(): void {
        const { permissions } = this.profileQuery.profile;
        this.ngxRolesService.addRole(this.profileQuery.baseRole, permissions);
        this.ngxPermissionsService.addPermission([this.profileQuery.baseRole, ...permissions]);
    }
}
