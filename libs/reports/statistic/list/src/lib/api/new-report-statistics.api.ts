import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { BaseReportApi, ReportPagesEnum, StatisticsResponseModel } from '@scaleo/reports/common';
import { NewStatisticBreakdownResponseModel } from '@scaleo/reports/statistic/common';
import { StatisticOutputParameterInterface } from '@scaleo/shared/components';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';
import { rxjsOperatorsUtil } from '@scaleo/utils';

@Injectable({
    providedIn: 'root'
})
export class NewReportStatisticsApi extends BaseReportApi {
    constructor(protected rest: RestApiService) {
        super(rest, ReportPagesEnum.Statistics);
    }

    getStatistics(filters?: Filter2Interface): Observable<ApiResponseWithPagination<StatisticsResponseModel>> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest.post<ApiResponse<StatisticsResponseModel>>('reports-statistics', payload, options).pipe(
            map((response) => ResponseUtil.pagination(response.headers, response.body.info.rows)),
            rxjsOperatorsUtil.emptyResponseOnCatchError({
                pagination: undefined,
                results: []
            })
        );
    }

    getBreakdowns(): Observable<NewStatisticBreakdownResponseModel[]> {
        return this.rest
            .get<ApiResponse<NewStatisticBreakdownResponseModel[]>>('reports-statistics-breakdowns')
            .pipe(pluck('info', 'breakdowns-list'));
    }

    configTableParameters(): Observable<StatisticOutputParameterInterface[]> {
        return this.rest.get('reports-statistics-options').pipe(map((columns) => columns?.info?.['columns-list'] || []));
    }

    exportData(filters?: Filter2Interface): Observable<any> {
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response',
                responseType: 'arrayBuffer'
            }
        };

        return this.rest.post('reports-statistics-export', payload, options);
    }
}
