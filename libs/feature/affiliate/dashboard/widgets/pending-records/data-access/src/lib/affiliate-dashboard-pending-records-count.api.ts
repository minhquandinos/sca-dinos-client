import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { AffiliateDashboardPendingRecordsCountModel } from './affiliate-dashboard-pending-records-count.model';

@Injectable()
export class AffiliateDashboardPendingRecordsCountApi {
    constructor(private rest: RestApiService) {}

    getCounts(): Observable<AffiliateDashboardPendingRecordsCountModel> {
        return this.rest
            .get<ApiResponse<AffiliateDashboardPendingRecordsCountModel>>('dashboard-counts-info')
            .pipe(pluck('info', 'counts'));
    }
}
