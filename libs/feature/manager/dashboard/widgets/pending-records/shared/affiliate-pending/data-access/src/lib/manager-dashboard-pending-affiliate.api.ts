import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiResponse, ApiResponseWithPagination, RequestUtil, ResponseUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { rxjsOperatorsUtil } from '@scaleo/utils';

import {
    ManagerDashboardPendingAffiliateModel,
    ManagerDashboardPendingAffiliateQueryParamsModel
} from './manager-dashboard-pending-affiliate.model';

@Injectable()
export class ManagerDashboardPendingAffiliateApi {
    constructor(private rest: RestApiService, private readonly jsonConvertService: JsonConvertService) {}

    index(
        queryParams: ManagerDashboardPendingAffiliateQueryParamsModel
    ): Observable<ApiResponseWithPagination<ManagerDashboardPendingAffiliateModel>> {
        const params = RequestUtil.queryParams(queryParams);

        const options = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<BaseObjectModel[]>>('affiliate-list', options).pipe(
            map(
                ({
                    headers,
                    body: {
                        info: { affiliates }
                    }
                }) => {
                    const affiliatesMapper = this.jsonConvertService.mapper(ManagerDashboardPendingAffiliateModel, affiliates);
                    return ResponseUtil.pagination<ManagerDashboardPendingAffiliateModel[]>(headers, affiliatesMapper);
                }
            ),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }
}
