import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { ManagerOfferCreativeDto } from '@scaleo/feature/manager/offer/creative/list/api';
import { ManagerOfferCreativeModel } from '@scaleo/feature/manager/offer/creative/list/data-access';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';

import { OfferCreativePayloadModel } from '../models/offer-creative-create.model';

@Injectable()
export class OfferCreativeCreateApi {
    readonly offerId = this.offerDetailQuery.id;

    constructor(private readonly rest: RestApiService, private readonly offerDetailQuery: OfferDetailQuery) {}

    create(post: OfferCreativePayloadModel | FormData): Observable<ManagerOfferCreativeDto> {
        const { offerId } = this;
        return this.rest
            .post<ApiResponse<ManagerOfferCreativeDto>>('offer-creatives-create', post, { urlParameters: { offerId } })
            .pipe(pluck('info', 'creative'));
    }

    update(id: number, post: OfferCreativePayloadModel): Observable<ManagerOfferCreativeDto> {
        const { offerId } = this;
        return this.rest
            .put<ApiResponse<ManagerOfferCreativeDto>>('offer-creatives-update', post, {
                urlParameters: { offerId, id }
            })
            .pipe(pluck('info', 'creative'));
    }

    view(id: number): Observable<ManagerOfferCreativeDto> {
        const { offerId } = this;
        const urlParameters = {
            offerId,
            id
        };
        return this.rest
            .get<ApiResponse<ManagerOfferCreativeDto>>('offer-creatives-view', { urlParameters })
            .pipe(pluck('info', 'creative-view'));
    }

    delete(id: number): Observable<void> {
        const { offerId } = this;
        return this.rest.delete<void>('offer-creatives-delete', { urlParameters: { offerId, id } });
    }
}
