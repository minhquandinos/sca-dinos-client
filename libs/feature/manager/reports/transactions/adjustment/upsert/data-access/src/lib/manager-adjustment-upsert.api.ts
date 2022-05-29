import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { AdjustmentActionsEnum } from '@scaleo/feature/manager/reports/transactions/adjustment/common';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { Util } from '@scaleo/utils';

import { AdjustmentUpsertModel, AdjustmentUpsertRequestModel } from './manager-adjustment-upsert.model';

@Injectable()
export class ManagerAdjustmentUpsertApi {
    constructor(private rest: RestApiService, private readonly pathFileService: PathFileService) {}

    update(editId: number, post: AdjustmentUpsertRequestModel): Observable<AdjustmentUpsertRequestModel> {
        return this.rest.put<AdjustmentUpsertRequestModel>('reports-adjustment-update', post, { urlParameters: { editId } });
    }

    create(post: AdjustmentUpsertRequestModel): Observable<AdjustmentUpsertRequestModel> {
        const postData = this.prepareFormData(post);
        return this.rest.post<AdjustmentUpsertRequestModel>('reports-adjustment-create', postData);
    }

    private prepareFormData(post: AdjustmentUpsertRequestModel): FormData | AdjustmentUpsertRequestModel {
        if (post.action_id === AdjustmentActionsEnum.InsertConversionsViaCSV) {
            const formData = new FormData();
            Object.keys(post).forEach((key) => {
                if ((post as any)?.[key]) {
                    formData.append(key, (post as any)?.[key]);
                }
            });

            return formData as FormData;
        }
        return post;
    }

    view(editId: number): Observable<AdjustmentUpsertModel> {
        return this.rest.get<AdjustmentUpsertModel>('reports-adjustment-view', { urlParameters: { editId } }).pipe(
            pluck('info', 'adjustment'),
            map((adjustment) => ({
                ...adjustment,
                conditions: Util.jsonParse(adjustment.conditions, []),
                parameters: Util.jsonParse(adjustment.parameters, []),
                details: Util.jsonParse(adjustment.details),
                filename: adjustment.filename ? this.pathFileService.getLinkToFile(adjustment.filename, 'adjustments') : ''
            }))
        );
    }

    delete(editId: number): Observable<void> {
        return this.rest.delete<any>('reports-adjustment-delete', { urlParameters: { editId } });
    }
}
