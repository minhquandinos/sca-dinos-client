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
import { ShortAffiliateModel, ShortGeoNameConfigModel, ShortGeoNameDto, ShortGeoNameModel } from '../models';

export class ShortGeoNames implements ShortEntityListInterface<ApiResponseWithPagination<ShortGeoNameModel[]>> {
    constructor(private readonly rest: RestApiService) {}

    private static transformDtoToModel(elem: ShortGeoNameDto): ShortGeoNameModel {
        const { id, title, country_code, country_title, region_title } = elem;
        return {
            id: +id,
            title,
            country_code,
            country_title,
            region_title
        };
    }

    list(config: ShortGeoNameConfigModel): Observable<ApiResponseWithPagination<ShortGeoNameModel[]>> {
        const params = RequestUtil.queryParams(config.queryParams);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<ShortGeoNameDto[]>>('geoip-get-geonames', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        info: { GeoNames }
                    }
                }) =>
                    ResponseUtil.pagination<ShortAffiliateModel[]>(
                        headers,
                        GeoNames.map((elem: any) => ShortGeoNames.transformDtoToModel(elem))
                    )
            )
        );
    }
}
