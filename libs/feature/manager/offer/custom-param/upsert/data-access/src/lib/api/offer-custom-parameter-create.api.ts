import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferCustomParamListDto } from '@scaleo/feature/manager/offer/custom-param/list/api';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';

import { OfferCustomParameterCreateDto } from '../models/offer-custom-parameter-create.model';

@Injectable()
export class OfferCustomParameterCreateApi {
    constructor(private readonly rest: RestApiService, private readonly offerDetailQuery: OfferDetailQuery) {}

    view(id: number): Observable<OfferCustomParamListDto> {
        const options: RestApiOptions = {
            urlParameters: { offerId: this.offerDetailQuery.id, id }
        };

        return this.rest.get<ApiResponse<OfferCustomParamListDto>>('custom-params-view', options).pipe(pluck('info', 'custom-param'));
    }

    create(post: OfferCustomParameterCreateDto): Observable<OfferCustomParamListDto> {
        const options: RestApiOptions = {
            urlParameters: { offerId: this.offerDetailQuery.id }
        };

        return this.rest.post('custom-params-create', post, options).pipe(pluck('info', 'custom-param'));
    }

    update(id: number, post: OfferCustomParameterCreateDto): Observable<OfferCustomParamListDto> {
        const options: RestApiOptions = {
            urlParameters: { offerId: this.offerDetailQuery.id, id }
        };
        return this.rest.put('custom-params-update', post, options).pipe(pluck('info', 'custom-param'));
    }

    delete(id: number): Observable<void> {
        const options: RestApiOptions = {
            urlParameters: { offerId: this.offerDetailQuery.id, id }
        };
        return this.rest.delete('custom-params-update', options).pipe(pluck('info', 'custom-param'));
    }
}
