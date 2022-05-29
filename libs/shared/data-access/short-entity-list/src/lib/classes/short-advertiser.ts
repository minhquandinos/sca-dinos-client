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
import { ShortAdvertiserConfigModel, ShortAdvertiserDto, ShortAdvertiserModel } from '../models';

export class ShortAdvertiser implements ShortEntityListInterface<ApiResponseWithPagination<ShortAdvertiserModel[]>> {
    constructor(private rest: RestApiService) {}

    private static transformDtoToModel(elem: ShortAdvertiserDto): ShortAdvertiserModel {
        return {
            id: elem.id,
            title: elem.company
        };
    }

    list(config: ShortAdvertiserConfigModel): Observable<ApiResponseWithPagination<ShortAdvertiserModel[]>> {
        const params = RequestUtil.queryParams(config?.queryParams);
        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<ShortAdvertiserModel[]>>('advertiser-get-filter-info', options).pipe(
            map(({ headers, body: { info } }) => {
                const items = info?.advertisers || [];
                return ResponseUtil.pagination<ShortAdvertiserModel[]>(
                    headers,
                    items.map((elem: ShortAdvertiserDto) => ShortAdvertiser.transformDtoToModel(elem))
                );
            })
        );
    }
}
