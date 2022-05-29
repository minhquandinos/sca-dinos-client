import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import {
    ApiResponse,
    ApiResponseWithPagination,
    RequestUtil,
    ResponseUtil,
    RestApiOptions,
    RestApiService
} from '@scaleo/core/rest-api/service';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { exportDataUtil, Util } from '@scaleo/utils';

import {
    BillingAffiliateBalanceDue,
    BillingAffiliatesExportRequestModel,
    BillingAffiliatesModel,
    BillingAffiliatesRequestModel
} from '../models/billing-affiliates.model';

@Injectable()
export class BillingAffiliatesApi {
    constructor(private readonly rest: RestApiService) {}

    list(queryParams: BillingAffiliatesRequestModel): Observable<ApiResponseWithPagination<BillingAffiliatesModel[]>> {
        const params = RequestUtil.queryParams(queryParams);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.get<ApiResponse<BillingAffiliatesModel[]>>('billing-affiliates-list', options).pipe(
            map((response) => {
                const { affiliates } = response.body.info;
                const pagination = ResponseUtil.pagination<BillingAffiliatesModel[]>(response.headers, affiliates);
                return {
                    ...pagination
                };
            })
        );
    }

    getColumnsOptions(): Observable<ConfigTableColumn2Model[]> {
        return this.rest.get('billing-affiliates-options').pipe(pluck('info', 'columns-list'));
    }

    exportData(filters: BillingAffiliatesExportRequestModel): Observable<HttpResponse<ArrayBuffer>> {
        const params = RequestUtil.queryParams(filters);
        return exportDataUtil(this.rest, 'billing-affiliates-export', {
            params
        });
    }

    getBalanceDue(): Observable<BillingAffiliateBalanceDue> {
        return this.rest.get('billing-balance-due').pipe(pluck('info'));
    }
}
