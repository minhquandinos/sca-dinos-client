import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { ChartModel } from '@scaleo/platform/chart/common';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

@Injectable()
export class PerformanceWidgetApi {
    constructor(private rest: RestApiService) {}

    index(filters: Filter2Interface): Observable<ChartModel[]> {
        const params = RequestUtil.queryParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        return this.rest
            .post<ApiResponse<ChartModel[]>>('dashboard-performance', payload, {
                request: { params }
            })
            .pipe(pluck('info'));
    }
}
