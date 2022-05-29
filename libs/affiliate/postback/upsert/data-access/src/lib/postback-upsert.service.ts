import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PostbackUpsertApi } from './postback-upsert.api';
import { ManagerAffiliatePostbackUpsertPayloadModel, PostbackUpsertViewModel } from './postback-upsert-view.model';

@Injectable({
    providedIn: 'root'
})
export class PostbackUpsertService {
    constructor(private api: PostbackUpsertApi) {}

    public create(affiliateId: number, post: ManagerAffiliatePostbackUpsertPayloadModel): Observable<PostbackUpsertViewModel> {
        return this.api.create(affiliateId, post);
    }

    update(affiliateId: number, postbackId: number, post: ManagerAffiliatePostbackUpsertPayloadModel): Observable<PostbackUpsertViewModel> {
        return this.api.update(affiliateId, postbackId, post);
    }

    public view(affiliateId: number, postbackId: number): Observable<PostbackUpsertViewModel> {
        return this.api.view(affiliateId, postbackId);
    }

    public delete(affiliateId: number, postbackId: number): Observable<void> {
        return this.api.delete(affiliateId, postbackId);
    }
}
