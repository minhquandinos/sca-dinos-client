import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { OffersExportParamsModel } from '@scaleo/offer/common';
import { exportDataUtil } from '@scaleo/utils';

@Injectable({
    providedIn: 'root'
})
export class OfferListApi {
    constructor(protected readonly rest: RestApiService) {}

    index<T, Q>(queryParams: Q): Observable<ApiResponseWithPagination<T>> {
        const params = RequestUtil.queryParams({
            ...queryParams
        });

        const options = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest
            .get<ApiResponse<T[]>>('offers-list', options)
            .pipe(map(({ headers, body: { info } }) => ResponseUtil.pagination<T[]>(headers, info?.offers || [])));
    }

    export(filters: OffersExportParamsModel): Observable<HttpResponse<ArrayBuffer>> {
        const params = RequestUtil.queryParams(filters);
        return exportDataUtil(this.rest, 'offers-export', {
            params
        });
    }
}
