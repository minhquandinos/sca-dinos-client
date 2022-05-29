import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { OfferAffiliateAccessDto } from '../models/offer-affiliate-access.model';

@Injectable()
export class OfferAffiliateAccessApi {
    constructor(private readonly rest: RestApiService) {}

    index(offerId: number): Observable<OfferAffiliateAccessDto> {
        return this.rest
            .get<ApiResponse<OfferAffiliateAccessDto>>('offer-affiliate-access-v2', {
                urlParameters: { offerId }
            })
            .pipe(pluck('info', 'affiliate-access'));
    }
}
