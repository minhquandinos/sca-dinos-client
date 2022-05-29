import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { ShortEntityListInterface } from '../interfaces/short-entity-list.interface';
import { ShortManagerModel } from '../models';
import { ShortManagerConfigModel, ShortManagerDto } from '../models/short-manager.model';

export class ShortManager implements ShortEntityListInterface<ApiResponseWithPagination<ShortManagerDto[]>> {
    constructor(
        private rest: RestApiService,
        private readonly jsonConvertService: JsonConvertService,
        private pathFileService: PathFileService
    ) {}

    list(config: ShortManagerConfigModel): Observable<ApiResponseWithPagination<ShortManagerModel[]>> {
        const params = RequestUtil.queryParams(config?.queryParams);
        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<ShortManagerDto[]>>('managers-get-filter-info', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { managers }
                    }
                }) => {
                    const results = this.jsonConvertService.mapper(
                        ShortManagerModel,
                        managers.map((manager: ShortManagerDto) => ({
                            ...manager,
                            image: this.pathFileService.platformImage(manager.image, 'users')
                        }))
                    );
                    return ResponseUtil.pagination<ShortManagerDto[]>(headers, results);
                }
            )
        );
    }
}
