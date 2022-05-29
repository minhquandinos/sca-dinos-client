import { Provider } from '@angular/core';

import { RolePermissionListApi } from './api/role-permission-list.api';
import { RolePermissionListQuery } from './state/role-permission-list.query';
import { RolePermissionListService } from './state/role-permission-list.service';
import { RolePermissionListStore } from './state/role-permission-list.store';

export const ROLE_PERMISSION_LIST_PROVIDER: Provider[] = [
    RolePermissionListApi,
    RolePermissionListStore,
    RolePermissionListService,
    RolePermissionListQuery
];
