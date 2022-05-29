import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { rxjsOperatorsUtil } from '@scaleo/utils';

@Injectable({
    providedIn: 'root'
})
export class ReferralApi {
    constructor(private readonly rest: RestApiService) {}

    index<R, Q>(queryParams: Q): Observable<ApiResponseWithPagination<R>>;
    index<R, Q>(queryParams: Q, affiliateId: number): Observable<ApiResponseWithPagination<R>>;
    index<R, Q>(queryParams: Q, affiliateId?: number): Observable<ApiResponseWithPagination<R>> {
        const params = RequestUtil.queryParams(queryParams);

        const options: RestApiOptions = {
            urlParameters: { affiliateId },
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<R>>('referrals', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { referrals }
                    }
                }) => {
                    return ResponseUtil.pagination<R>(headers, referrals);
                }
            ),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }
}
