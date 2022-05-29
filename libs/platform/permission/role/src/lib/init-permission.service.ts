import { Injectable } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

import { ProfileQuery } from '@scaleo/account/data-access';

import { RolePermission } from './classes/role-permission';

@Injectable({
    providedIn: 'root'
})
export class InitPermissionService {
    constructor(
        private profileQuery: ProfileQuery,
        private ngxRolesService: NgxRolesService,
        private ngxPermissionsService: NgxPermissionsService
    ) {}

    async setRolePermission(): Promise<void> {
        try {
            this.setPermissions();
        } catch (e) {
            console.error(e);
        }
    }

    setPermissions(): void {
        const rolePermission = new RolePermission(this.profileQuery, this.ngxRolesService, this.ngxPermissionsService);
        rolePermission.set();
    }
}
