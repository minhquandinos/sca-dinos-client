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

import { ManagerOfferCreativeDto, ManagerOfferCreativeListQueryParamsDto } from './offer-creative-list.dto';

@Injectable({
    providedIn: 'root'
})
export class OfferCreativeListApi {
    constructor(private readonly rest: RestApiService) {}

    index(
        offerId: number,
        queryParams: ManagerOfferCreativeListQueryParamsDto
    ): Observable<ApiResponseWithPagination<ManagerOfferCreativeDto[]>> {
        const params = RequestUtil.queryParams(queryParams);

        const options: RestApiOptions = {
            urlParameters: {
                offerId
            },
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<ManagerOfferCreativeDto[]>>('offers-creatives-list', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { creatives }
                    }
                }) => ResponseUtil.pagination<ManagerOfferCreativeDto[]>(headers, creatives)
            )
        );
    }
}
