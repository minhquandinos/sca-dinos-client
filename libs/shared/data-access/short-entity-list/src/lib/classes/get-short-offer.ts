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

import { ShortEntityListInterface } from '../interfaces/short-entity-list.interface';
import { ShortOfferConfigModel, ShortOfferModel } from '../models';

export class GetShortOffer implements ShortEntityListInterface<ApiResponseWithPagination<ShortOfferModel[]>> {
    constructor(private rest: RestApiService) {}

    list(config: ShortOfferConfigModel): Observable<ApiResponseWithPagination<ShortOfferModel[]>> {
        const params = RequestUtil.queryParams(config?.queryParams);
        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<ShortOfferModel[]>>('offers-get-filter-info', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { offers }
                    }
                }) => {
                    return ResponseUtil.pagination<ShortOfferModel[]>(headers, offers);
                }
            )
        );
    }
}
