import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { OfferDetailViewDto } from './models/offer-detail.model';

@Injectable()
export class OfferInfoWidgetApi {
    constructor(private readonly rest: RestApiService) {}

    view(id: number): Observable<OfferDetailViewDto> {
        return this.rest
            .get<ApiResponse<OfferDetailViewDto>>('offer-view', {
                urlParameters: { id }
            })
            .pipe(pluck('info', 'details'));
    }
}
