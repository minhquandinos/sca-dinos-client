import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponse, ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { rxjsOperatorsUtil } from '@scaleo/utils';

import {
    ManagerDashboardPendingAdvertiserModel,
    ManagerDashboardPendingAdvertiserQueryParamsModel
} from './manager-dashboard-pending-advertiser.model';

@Injectable()
export class ManagerDashboardPendingAdvertiserApi {
    constructor(private rest: RestApiService, private readonly jsonConvertService: JsonConvertService) {}

    index(
        queryParams: ManagerDashboardPendingAdvertiserQueryParamsModel
    ): Observable<ApiResponseWithPagination<ManagerDashboardPendingAdvertiserModel[]>> {
        const params = RequestUtil.queryParams(queryParams);

        const options = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<BaseObjectModel[]>>('advertisers-list', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { advertisers }
                    }
                }) => {
                    const advertisersMapper = this.jsonConvertService.mapper(ManagerDashboardPendingAdvertiserModel, advertisers);
                    return ResponseUtil.pagination<ManagerDashboardPendingAdvertiserModel[]>(headers, advertisersMapper);
                }
            ),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }
}
