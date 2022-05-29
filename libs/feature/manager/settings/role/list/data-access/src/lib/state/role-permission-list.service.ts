import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { RolePermissionListModel } from '@scaleo/feature/manager/settings/role/common';

import { RolePermissionListApi } from '../api/role-permission-list.api';
import { RolePermissionListQuery } from './role-permission-list.query';
import { ManagerSettingsRolePermissionState, RolePermissionListStore } from './role-permission-list.store';

@Injectable()
export class RolePermissionListService extends BaseEntityService<ManagerSettingsRolePermissionState> {
    constructor(
        protected store: RolePermissionListStore,
        protected query: RolePermissionListQuery,
        private readonly api: RolePermissionListApi
    ) {
        super(store, query);
    }

    index(): Observable<RolePermissionListModel[]> {
        const observable = this.api.index().pipe(
            tap((items) => {
                this.store.set(items);
            })
        );

        return this.observable(observable);
    }
}
