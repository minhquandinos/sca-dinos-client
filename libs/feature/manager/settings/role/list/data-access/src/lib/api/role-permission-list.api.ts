import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { RolePermissionListModel } from '../../../../../common/src/lib/role-permission-list.model';

@Injectable()
export class RolePermissionListApi {
    constructor(private readonly rest: RestApiService) {}

    index(): Observable<RolePermissionListModel[]> {
        return this.rest.get<ApiResponse<RolePermissionListModel[]>>('settings-roles-list').pipe(pluck('info'));
    }
}
