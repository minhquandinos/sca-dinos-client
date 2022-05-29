import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { PlatformListsService } from '@scaleo/platform/list/access-data';
import { ContactAdapter } from '@scaleo/shared/components/contact';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { TeammateListModel, TeammateListQueryParamsModel } from '../teammate-list.model';

@Injectable()
export class TeammateListApi {
    constructor(
        private readonly pathFileService: PathFileService,
        private readonly rest: RestApiService,
        private readonly jsonConvertService: JsonConvertService,
        private readonly platformListsService: PlatformListsService
    ) {}

    index(queryParams: TeammateListQueryParamsModel): Observable<ApiResponseWithPagination<TeammateListModel>> {
        const params = RequestUtil.queryParams(queryParams);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<TeammateListModel>>('managers-list', options).pipe(
            map((response) => {
                const { body = undefined, headers = undefined } = response || {};
                const {
                    info: { managers }
                } = body || { info: { managers: [] } };
                return ResponseUtil.pagination<TeammateListModel>(headers, managers);
            })
        );
    }
}
