import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';

import { OfferRequestModel, OfferRequestQueryParamsDto } from '../models/offer-request.model';

@Injectable()
export class OffersRequestsApi {
    constructor(private readonly rest: RestApiService) {}

    index(queryParams: OfferRequestQueryParamsDto): Observable<ApiResponseWithPagination<OfferRequestModel>> {
        const options: RestApiOptions = {
            request: {
                params: RequestUtil.queryParams(queryParams),
                observe: 'response'
            }
        };
        return this.rest.get('offers-requests-collection', options).pipe(map((response) => ResponseUtil.prepare(response)));
    }
}
