import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { RolePermissionListModel } from '@scaleo/feature/manager/settings/role/common';

export type ManagerSettingsRolePermissionState = BaseEntityState<RolePermissionListModel>;

@Injectable()
@StoreConfig({ name: 'manager-settings-role-permission-list', idKey: 'role' })
export class RolePermissionListStore extends BaseEntityStore<ManagerSettingsRolePermissionState> {
    constructor() {
        super();
    }
}
