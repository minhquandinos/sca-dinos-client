import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferDetailViewDto } from '@scaleo/feature/manager/offer/detail/widget/data-access';

import { OfferPayloadModel } from '../models/offer-upsert.model';

@Injectable()
export class OfferUpsertApi {
    constructor(private readonly rest: RestApiService) {}

    view(id: number): Observable<OfferDetailViewDto> {
        return this.rest
            .get<ApiResponse<OfferDetailViewDto>>('offer-edit-view', {
                urlParameters: { id }
            })
            .pipe(pluck('info', 'details'));
    }

    create(post: OfferPayloadModel): Observable<void> {
        return this.rest.post<void>('offer-create', post);
    }

    update(id: number, post: OfferPayloadModel): Observable<OfferDetailViewDto> {
        return this.rest.put<ApiResponse<OfferDetailViewDto>>('offer-update', post, { urlParameters: { id } }).pipe(pluck('info', 'offer'));
    }

    delete(id: number): Observable<void> {
        return this.rest.delete<void>('offer-delete', { urlParameters: { id } });
    }

    deleteImage(id: number): Observable<void> {
        return this.rest.delete<void>('offer-delete-image', { urlParameters: { id } });
    }
}
