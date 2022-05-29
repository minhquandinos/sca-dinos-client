import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { BaseReportApi, ReportPagesEnum, StatisticInterface } from '@scaleo/reports/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';
import { rxjsOperatorsUtil } from '@scaleo/utils';

@Injectable({ providedIn: 'root' })
export class ReportClickApi extends BaseReportApi {
    constructor(protected rest: RestApiService) {
        super(rest, ReportPagesEnum.Clicks);
    }

    public get(filters?: Filter2Interface): Observable<ApiResponseWithPagination<StatisticInterface>> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.post<ApiResponse<StatisticInterface>>('reports-click', payload, options).pipe(
            map((response) => ResponseUtil.pagination(response.headers, response.body.info.transactions)),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }

    getColumnsOptions(): Observable<ConfigTableColumn2Model[]> {
        return this.rest.get('reports-click-options').pipe(pluck('info', 'columns-list'));
    }

    public exportData(filters?: Filter2Interface): Observable<any> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response',
                responseType: 'arrayBuffer'
            }
        };

        return this.rest.post('reports-click-export', payload, options);
    }
}
