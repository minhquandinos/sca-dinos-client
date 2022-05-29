import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { ManagerAdjustmentUpsertApi } from './manager-adjustment-upsert.api';
import { AdjustmentUpsertModel, AdjustmentUpsertRequestModel } from './manager-adjustment-upsert.model';

@Injectable()
export class ManagerAdjustmentUpsertService {
    constructor(
        private rest: RestApiService,
        private readonly pathFileService: PathFileService,
        private readonly api: ManagerAdjustmentUpsertApi
    ) {}

    update(editId: number, post: AdjustmentUpsertRequestModel): Observable<AdjustmentUpsertRequestModel> {
        return this.rest.put<AdjustmentUpsertRequestModel>('reports-adjustment-update', post, { urlParameters: { editId } });
    }

    create(post: AdjustmentUpsertRequestModel): Observable<AdjustmentUpsertRequestModel> {
        return this.api.create(post);
    }

    view(editId: number): Observable<AdjustmentUpsertModel> {
        return this.api.view(editId);
    }

    delete(editId: number): Observable<void> {
        return this.api.delete(editId);
    }
}
