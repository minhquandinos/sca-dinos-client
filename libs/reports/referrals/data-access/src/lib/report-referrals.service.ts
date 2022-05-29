import { Injectable } from '@angular/core';
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
import { referralCommissions } from '@scaleo/platform/referral/common';
import { StatisticInterface } from '@scaleo/reports/common';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

import { ReportReferralsInterface } from './report-referrals.interface';

@Injectable({
    providedIn: 'root'
})
export class ReportReferralsService {
    constructor(private rest: RestApiService) {}

    index<R = unknown, Q = unknown, P = unknown>(queryParams: Q, payloadParams: P): Observable<ApiResponseWithPagination<R>> {
        const params = RequestUtil.queryParams(queryParams);
        const payload = RequestUtil.payloadParams(payloadParams);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest.post<ApiResponse<R>>('reports-referrals', payload, options).pipe(
            map((response) => {
                const data = response.body.info.report.map((item: any) => ({
                    ...item,
                    referral_commission_source: referralCommissions
                }));

                return ResponseUtil.pagination(response.headers, data);
            })
        );
    }

    list(filters?: Filter2Interface): Observable<ApiResponseWithPagination<ReportReferralsInterface>> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest.post<ApiResponse<StatisticInterface>>('reports-referrals', payload, options).pipe(
            map((response) => {
                const data = response.body.info.report.map((item: any) => ({
                    ...item,
                    referral_commission_source: referralCommissions
                }));

                return ResponseUtil.pagination(response.headers, data);
            })
        );
    }
}
