import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ManagerSettingsRolePermissionState, RolePermissionListStore } from './role-permission-list.store';

@Injectable()
export class RolePermissionListQuery extends BaseEntityQuery<ManagerSettingsRolePermissionState> {
    constructor(protected store: RolePermissionListStore) {
        super(store);
    }
}
