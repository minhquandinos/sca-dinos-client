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
import { ShortAffiliateConfigModel, ShortAffiliateDto, ShortAffiliateModel } from '../models';

export class ShortAffiliate implements ShortEntityListInterface<ApiResponseWithPagination<ShortAffiliateModel[]>> {
    constructor(private rest: RestApiService) {}

    private static transformDtoToModel(elem: ShortAffiliateDto): ShortAffiliateModel {
        return {
            id: elem.id,
            title: elem.company
        };
    }

    list(config: ShortAffiliateConfigModel): Observable<ApiResponseWithPagination<ShortAffiliateModel[]>> {
        const params = RequestUtil.queryParams(config?.queryParams);
        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<ShortAffiliateDto[]>>('affiliate-get-filter-info', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { affiliates }
                    }
                }) =>
                    ResponseUtil.pagination<ShortAffiliateModel[]>(
                        headers,
                        affiliates.map((elem: ShortAffiliateDto) => ShortAffiliate.transformDtoToModel(elem))
                    )
            )
        );
    }
}
