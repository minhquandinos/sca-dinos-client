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
import { ShortSponsorConfigModel, ShortSponsorDto, ShortSponsorModel } from '../models';

export class ShortSponsor implements ShortEntityListInterface<ApiResponseWithPagination<ShortSponsorDto[]>> {
    constructor(private rest: RestApiService) {}

    private static transformDtoToModel(elem: ShortSponsorDto): ShortSponsorModel {
        return {
            id: elem.id,
            title: elem.company
        };
    }

    list(config: ShortSponsorConfigModel): Observable<ApiResponseWithPagination<ShortSponsorModel[]>> {
        const params = RequestUtil.queryParams(config?.queryParams);
        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<ShortSponsorDto[]>>('affiliate-get-sponsor', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { sponsors }
                    }
                }) =>
                    ResponseUtil.pagination<ShortSponsorModel[]>(
                        headers,
                        sponsors.map((elem: ShortSponsorDto) => ShortSponsor.transformDtoToModel(elem))
                    )
            )
        );
    }
}
