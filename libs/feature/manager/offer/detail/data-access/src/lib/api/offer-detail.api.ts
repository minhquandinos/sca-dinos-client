import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferDetailViewDto } from '@scaleo/feature/manager/offer/detail/widget/data-access';
import { OfferConfigCountsDto } from '@scaleo/offer/common';

@Injectable({
    providedIn: 'root'
})
export class OfferDetailApi {
    constructor(private readonly rest: RestApiService) {}

    counts(id: number): Observable<OfferConfigCountsDto> {
        return this.rest.get<ApiResponse<OfferConfigCountsDto>>('offers-counts-info', { urlParameters: { id } }).pipe(pluck('info'));
    }

    view(id: number): Observable<OfferDetailViewDto> {
        return this.rest
            .get<ApiResponse<OfferDetailViewDto>>('offer-view', {
                urlParameters: { id }
            })
            .pipe(pluck('info', 'details'));
    }
}
