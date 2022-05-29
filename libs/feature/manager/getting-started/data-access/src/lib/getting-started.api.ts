import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { GettingStartedCompleteModel } from '@scaleo/feature/manager/getting-started/data-access';

@Injectable()
export class GettingStartedApi {
    constructor(private readonly rest: RestApiService) {}

    hideGettingStarted(): Observable<any> {
        // TODO fixed any
        return this.rest.get<ApiResponse<any>>('hide-getting-started');
    }

    getCompleteStages(): Observable<GettingStartedCompleteModel> {
        return this.rest.get<ApiResponse<GettingStartedCompleteModel>>('get-getting-started-stages').pipe(pluck('info', 'stages'));
    }

    completeGettingStarted(stageId: number): Observable<void> {
        // TODO fixed any
        return this.rest.get<ApiResponse<void>>('complete-getting-started-stage', {
            urlParameters: { stageId }
        });
    }
}
