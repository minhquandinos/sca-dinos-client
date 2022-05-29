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
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

import { ShortEntityListInterface } from '../interfaces/short-entity-list.interface';
import { ShortOfferLandingConfigModel, ShortOfferLandingPageModel } from '../models';

export class ShortOfferLandingPage implements ShortEntityListInterface {
    constructor(private readonly rest: RestApiService) {}

    list(config: ShortOfferLandingConfigModel): Observable<ApiResponseWithPagination<ShortOfferLandingPageModel[]>> {
        const { offerId, search, page, exact } = config;
        const params = { sort: 'id', direction: 'asc', search, page, exact, status: PlatformListsStatusesNameEnum.Active };
        const options: RestApiOptions = {
            request: {
                params: RequestUtil.queryParams(params),
                observe: 'response'
            },
            urlParameters: { offerId }
        };

        return this.rest
            .get<ApiResponse<ShortOfferLandingPageModel>>('offer-url-get-filter-info', options)
            .pipe(map(({ headers, body }) => ResponseUtil.pagination(headers, body.info.urls)));
    }
}
