import { Observable, pluck } from 'rxjs';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { ShortEntityListInterface } from '../interfaces/short-entity-list.interface';
import { ShortBaseRoleDto, ShortBaseRoleModel } from '../models/short-base-role.model';

export class ShortBaseRole implements ShortEntityListInterface<ShortBaseRoleDto[]> {
    constructor(private rest: RestApiService) {}

    list(): Observable<ShortBaseRoleModel[]> {
        return this.rest.get<ApiResponse<ShortBaseRoleDto[]>>('base-role-list').pipe(pluck('info'));
    }
}
