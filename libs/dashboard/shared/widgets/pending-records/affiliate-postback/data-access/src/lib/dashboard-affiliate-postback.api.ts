import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { DashboardPendingPostbackDto, DashboardPendingPostbackModel } from './dashboard-affiliate-postback.model';

@Injectable()
export class DashboardAffiliatePostbackApi {
    constructor(private readonly rest: RestApiService, private readonly jsonConvertService: JsonConvertService) {}

    index(): Observable<DashboardPendingPostbackModel[]> {
        return this.rest.get<ApiResponse<DashboardPendingPostbackDto[]>>('dashboard-pending-postbacks').pipe(
            pluck('info', 'pending-postbacks'),
            map((response) => {
                return this.jsonConvertService.mapper(DashboardPendingPostbackModel, response);
            })
        );
    }
}
