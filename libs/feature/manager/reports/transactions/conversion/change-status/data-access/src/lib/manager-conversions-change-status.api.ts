import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestApiService } from '@scaleo/core/rest-api/service';

import { ManagerConversionsChangeStatusPayloadParamsModel } from './conversions-change-status.model';

@Injectable()
export class ManagerConversionsChangeStatusApi {
    constructor(protected rest: RestApiService) {}

    changeStatus(payload: ManagerConversionsChangeStatusPayloadParamsModel): Observable<unknown> {
        return this.rest.post<unknown>('reports-conversions-change-status', payload);
    }
}
