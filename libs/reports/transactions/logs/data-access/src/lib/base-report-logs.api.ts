import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { BaseReportApi, ReportPagesEnum, StatisticInterface } from '@scaleo/reports/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';
import { rxjsOperatorsUtil } from '@scaleo/utils';

@Injectable({ providedIn: 'root' })
export class BaseReportLogsApi extends BaseReportApi {
    constructor(protected rest: RestApiService, protected pageType: ReportPagesEnum) {
        super(rest, pageType);
    }

    public get(filters?: Filter2Interface, path?: string, key: string = 'rows'): Observable<ApiResponseWithPagination<StatisticInterface>> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest.post<ApiResponse<StatisticInterface>>(path, payload, options).pipe(
            map((response) => ResponseUtil.pagination(response.headers, response.body.info[key])),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }

    public getColumnsOptions(path: string): Observable<ConfigTableColumn2Model[]> {
        return this.rest.get(path).pipe(pluck('info', 'columns-list'));
    }
}
