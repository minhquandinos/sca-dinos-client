import { Injectable } from '@angular/core';
import { Observable, pluck } from 'rxjs';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { ManagerAffiliatePostbackUpsertPayloadModel, PostbackUpsertViewModel } from './postback-upsert-view.model';

@Injectable({ providedIn: 'root' })
export class PostbackUpsertApi {
    constructor(private readonly rest: RestApiService, private readonly jsonConvertService: JsonConvertService) {}

    create(affiliateId: number, post: ManagerAffiliatePostbackUpsertPayloadModel): Observable<PostbackUpsertViewModel> {
        return this.rest.post<PostbackUpsertViewModel>('postback-create', post, { urlParameters: { affiliateId } });
    }

    update(affiliateId: number, postbackId: number, post: ManagerAffiliatePostbackUpsertPayloadModel): Observable<PostbackUpsertViewModel> {
        return this.rest.put<PostbackUpsertViewModel>('postback-update', post, {
            urlParameters: { affiliateId, postbackId }
        });
    }

    view(affiliateId: number, postbackId: number): Observable<PostbackUpsertViewModel> {
        return this.rest
            .get<PostbackUpsertViewModel>('postback-view', { urlParameters: { affiliateId, postbackId } })
            .pipe(pluck('info', 'postback'));
    }

    delete(affiliateId: number, postbackId: number): Observable<void> {
        return this.rest.delete<void>('postback-delete', { urlParameters: { affiliateId, postbackId } });
    }
}
