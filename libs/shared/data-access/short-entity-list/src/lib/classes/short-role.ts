import { Observable, pluck } from 'rxjs';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { ShortEntityListInterface } from '../interfaces/short-entity-list.interface';
import { ShortRoleDto, ShortRoleModel } from '../models/short-role.model';

export class ShortRole implements ShortEntityListInterface<ShortRoleDto[]> {
    constructor(private rest: RestApiService) {}

    list(): Observable<ShortRoleModel[]> {
        return this.rest.get<ApiResponse<ShortRoleDto[]>>('role-list').pipe(pluck('info'));
    }
}
