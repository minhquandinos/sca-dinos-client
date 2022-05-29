import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JsonConvertService } from '@scaleo/core/services/json-convert';

import { AffiliateUpsertApi } from './affiliate-upsert.api';
import { AffiliateUpsertFormControlModel, AffiliateUpsertModel, AffiliateUpsertPayloadDto } from './affiliate-upsert.model';

@Injectable()
export class AffiliateUpsertService {
    constructor(private readonly api: AffiliateUpsertApi, private readonly jsonConvertService: JsonConvertService) {}

    view(id: number): Observable<AffiliateUpsertModel> {
        return this.api.view(id);
    }

    create(post: AffiliateUpsertFormControlModel): Observable<AffiliateUpsertModel> {
        return this.api.create(this.mapper(post));
    }

    update(id: number, post: AffiliateUpsertFormControlModel): Observable<AffiliateUpsertModel> {
        return this.api.update(id, this.mapper(post));
    }

    delete(id: number): Observable<void> {
        return this.api.delete(id);
    }

    deleteImage(id: number): Observable<void> {
        return this.api.deleteImage(id);
    }

    private mapper(post: AffiliateUpsertFormControlModel): AffiliateUpsertPayloadDto {
        return this.jsonConvertService.mapper(AffiliateUpsertPayloadDto, post);
    }
}
