import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { StatisticInterface } from '@scaleo/reports/common';
import { NewStatisticBreakdownResponseModel } from '@scaleo/reports/statistic/common';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

@Injectable({
    providedIn: 'root'
})
export class ReportStatisticsService {
    // private baseStatistic: StatisticOptions;

    constructor(private rest: RestApiService, private translate: TranslateService) {
        // this.baseStatistic = new StatisticOptions(http, rest);
    }

    list(filters?: Filter2Interface): Observable<ApiResponseWithPagination<StatisticInterface>> {
        // TODO refactor translate, need move logic for lang from component to new translate service
        const params = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };
        return this.rest
            .post<ApiResponse<StatisticInterface>>('reports-statistics', payload, options)
            .pipe(map((response) => ResponseUtil.pagination(response.headers, response.body.info.rows)));
    }

    getBreakdowns(): Observable<NewStatisticBreakdownResponseModel[]> {
        return this.rest
            .get<ApiResponse<NewStatisticBreakdownResponseModel[]>>('reports-statistics-breakdowns')
            .pipe(pluck('info', 'breakdowns-list'));
    }

    // configTableParameters(): Observable<StatisticOutputParameterInterface[]> {
    //     return this.baseStatistic.configTableParameters<StatisticOutputParameterInterface>('reports-statistics-options');
    // }

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
