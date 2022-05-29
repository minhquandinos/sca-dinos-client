import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { ChartModel, DashboardWidgetChartSeriesInterface } from '@scaleo/platform/chart/common';

import { NetworkSummaryBodyWidgetDto, NetworkSummaryQueryParamsWidgetDto } from '../requests/network-summary-widget.model';

@Injectable({
    providedIn: 'root'
})
export class NetworkSummeryWidgetApi {
    constructor(private rest: RestApiService) {}

    index(queryParams: NetworkSummaryQueryParamsWidgetDto, bodyParams: NetworkSummaryBodyWidgetDto): Observable<ChartModel[]> {
        const params = RequestUtil.queryParams(queryParams);

        return this.rest
            .post<ApiResponse<DashboardWidgetChartSeriesInterface[]>>('dashboard-statistics-network-summary', bodyParams, {
                request: { params }
            })
            .pipe(pluck('info'));
    }
}
