import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';

@Injectable({
    providedIn: 'root'
})
export class SmartLinksApi {
    constructor(private rest: RestApiService) {}

    index<T, Q>(queryParams?: Q): Observable<ApiResponseWithPagination<T[]>> {
        const params = RequestUtil.queryParams(queryParams);
        const options = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest.get<ApiResponse<T[]>>('smart-link-list', options).pipe(
            map(({ headers, body: { info } }) => {
                return ResponseUtil.pagination<T[]>(headers, info?.['smart-links'] || []);
            })
        );
    }
}
