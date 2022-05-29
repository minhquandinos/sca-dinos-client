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

import { LeadsLogModel, LeadsLogPayloadDto, LeadsLogQueryParamsModel } from '../model/leads-log.model';

@Injectable()
export class LeadsLogsApi {
    constructor(private rest: RestApiService) {}

    index(
        queryParams: LeadsLogQueryParamsModel,
        payloadParams: LeadsLogPayloadDto
    ): Observable<ApiResponseWithPagination<LeadsLogModel[]>> {
        const params = RequestUtil.queryParams(queryParams);
        const payload = RequestUtil.payloadParams(payloadParams);

        const options: RestApiOptions = {
            request: {
                params,
                observe: 'response'
            }
        };

        return this.rest
            .post<ApiResponse<LeadsLogModel[]>>('leads-logs', payload, options)
            .pipe(map((response) => ResponseUtil.pagination(response.headers, response.body.info.rows)));
    }

    getColumnsOptions(logType: string): Observable<ConfigTableColumn2Model[]> {
        return this.rest.get('leads-logs-options', { urlParameters: { logType } }).pipe(pluck('info', 'columns-list'));
    }
}
