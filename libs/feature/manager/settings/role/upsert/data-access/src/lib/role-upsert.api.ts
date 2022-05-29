import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { DefaultRoleEnum } from '@scaleo/platform/role/models';

import {
    PermissionUpsertConfigureGroupModel,
    PermissionUpsertRoleModel,
    PermissionUpsertViewModel,
    RolePermissionCreatePayloadDto,
    RolePermissionUpdatePayloadDto
} from './role-upsert.model';

@Injectable()
export class RoleUpsertApi {
    constructor(private readonly rest: RestApiService) {}

    roles(): Observable<PermissionUpsertRoleModel[]> {
        return this.rest.get('/roles/list');
    }

    view(role: string): Observable<PermissionUpsertViewModel> {
        return this.rest.post('settings-role-permission-view', role);
    }

    viewConfigure(role: string): Observable<PermissionUpsertConfigureGroupModel[]> {
        return this.rest
            .post<ApiResponse<PermissionUpsertConfigureGroupModel[]>>('settings-role-permission-view-configure', { role })
            .pipe(pluck('info'));
    }

    create(payload: Partial<RolePermissionCreatePayloadDto>): Observable<PermissionUpsertViewModel> {
        return this.rest.post('settings-role-permission-create', payload);
    }

    update(payload: Partial<RolePermissionUpdatePayloadDto>): Observable<PermissionUpsertViewModel> {
        return this.rest.put('settings-role-permission-update', payload);
    }

    delete(role: DefaultRoleEnum | string): Observable<void> {
        const params = RequestUtil.queryParams({ role });
        return this.rest.delete('settings-role-permission-upset-delete', { request: { params } });
    }
}
