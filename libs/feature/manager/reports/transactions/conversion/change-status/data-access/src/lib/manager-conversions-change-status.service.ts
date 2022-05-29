import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ManagerConversionsChangeStatusPayloadParamsModel } from './conversions-change-status.model';
import { ManagerConversionsChangeStatusApi } from './manager-conversions-change-status.api';

@Injectable()
export class ManagerConversionsChangeStatusService {
    constructor(private api: ManagerConversionsChangeStatusApi) {}

    changeStatus(payload: ManagerConversionsChangeStatusPayloadParamsModel): Observable<unknown> {
        return this.api.changeStatus(payload);
    }
}
