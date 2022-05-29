import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';

import { OfferCustomParamListDto, OfferCustomParamListQueryParamsDto } from './offer-custom-param-list.dto';

@Injectable({
    providedIn: 'root'
})
export class OfferCustomParamListApi {
    constructor(private readonly rest: RestApiService, private readonly offerDetailQuery: OfferDetailQuery) {}

    index(
        offerId: number,
        queryParams: OfferCustomParamListQueryParamsDto
    ): Observable<ApiResponseWithPagination<OfferCustomParamListDto[]>> {
        const options: RestApiOptions = {
            urlParameters: { offerId },
            request: {
                params: RequestUtil.queryParams(queryParams),
                observe: 'response'
            }
        };
        return this.rest.get('custom-params-list', options).pipe(
            map(({ headers, body: { info } }) => {
                const customParams = info['custom-params'];
                return ResponseUtil.pagination(headers, customParams);
            })
        );
    }
}
