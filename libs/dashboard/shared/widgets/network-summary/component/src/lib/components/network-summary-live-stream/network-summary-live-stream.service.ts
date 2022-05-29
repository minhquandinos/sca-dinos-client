import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { Filter2Interface, QueryHelper } from '@scaleo/shared/services/filters';

import { NetworkSummaryLiveStreamInterface } from './network-summary-live-stream.interface';

@Injectable()
export class NetworkSummaryLiveStreamService {
    constructor(private rest: RestApiService) {}

    data(): Observable<NetworkSummaryLiveStreamInterface> {
        const filters: Filter2Interface = {
            params: {
                page: 1,
                perPage: 10,
                lang: 'ru',
                sortField: 'added_date',
                sortDirection: 'desc'
            },
            payload: { breakdown: 'minute', breakdowns: 'minute', columns: 'cv_total' }
        };

        const queryParams = QueryHelper.filtersHttpParams(filters.params);
        const payload = QueryHelper.filtersBodyParams(filters.payload);

        const params: RestApiOptions = {
            request: {
                params: queryParams
            }
        };

        return this.rest.post<ApiResponse<NetworkSummaryLiveStreamInterface>>('dashboard-live-stream', payload, params).pipe(
            pluck('info'),
            map((response) => response.shift()),
            pluck('current'),
            map((value: NetworkSummaryLiveStreamInterface) => ({
                ...value,
                series: value?.series ? value.series : [],
                ranges: value?.ranges ? value.ranges.map((range) => range.split(' ').pop()) : []
            }))
        );
    }
}
