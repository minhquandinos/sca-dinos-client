import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { RequestUtil, RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import {
    TeammateUpsertPayloadDto,
    TeammateUpsertViewDto,
    TeammateUpsertViewModel
} from '@scaleo/feature/manager/settings/teammate/upsert/data-access';
import { PathFileService } from '@scaleo/shared/services/path-file';

@Injectable()
export class TeammateUpsertApi {
    constructor(
        private readonly pathFileService: PathFileService,
        private translate: TranslateService,
        private rest: RestApiService,
        private jsonConvertService: JsonConvertService
    ) {}

    view(editId: number): Observable<TeammateUpsertViewModel> {
        return this.rest
            .get<TeammateUpsertViewDto>('manager-view', {
                urlParameters: { editId }
            })
            .pipe(
                pluck('info', 'manager'),
                map((response) => {
                    const mapper = this.jsonConvertService.mapper(TeammateUpsertViewModel, response);

                    return {
                        ...mapper,
                        image: this.pathFileService.platformImage(mapper.image)
                    };
                })
            );
    }

    create(post: TeammateUpsertPayloadDto): Observable<TeammateUpsertViewModel> {
        return this.rest.post<TeammateUpsertViewDto>('manager-create', post);
    }

    update(editId: number | string, post: TeammateUpsertPayloadDto): Observable<TeammateUpsertViewModel> {
        return this.rest.put<TeammateUpsertViewDto>('manager-update', post, {
            urlParameters: { editId }
        });
    }

    delete(editId: number, active_managers: number): Observable<void> {
        const params = RequestUtil.queryParams({ active_managers });
        return this.rest.delete<void>('manager-delete', { urlParameters: { editId }, request: { params } });
    }

    deleteImage(editId: number | string): Observable<void> {
        return this.rest.delete('manager-delete-image', { urlParameters: { editId } });
    }

    updateApiKey(user_id: number, role: string): Observable<string> {
        const post = {
            user_id,
            role
        };
        return this.rest.post<string>(`change-api-key`, post).pipe(pluck('info', 'api-key'));
    }
}
