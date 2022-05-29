import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';

import { ShortEntityListInterface } from '../interfaces/short-entity-list.interface';
import { ShortOperatingSystemDto } from '../models';
import { ShortOperatingSystemModel } from '../models/short-operating-system.model';

export class ShortOperatingSystem implements ShortEntityListInterface<ApiResponseWithPagination<ShortOperatingSystemDto[]>> {
    constructor(private rest: RestApiService) {}

    list(): Observable<ApiResponseWithPagination<ShortOperatingSystemModel[]>> {
        const options: RestApiOptions = {
            request: {
                observe: 'response'
            }
        };

        return this.rest
            .get<ApiResponse<ShortOperatingSystemDto[]>>('operating-systems-get-filter-info', options)
            .pipe(
                map(({ headers, body: { info } }) =>
                    ResponseUtil.pagination<ShortOperatingSystemDto[]>(headers, info?.['operating-systems'] || [])
                )
            );
    }
}
