import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { OfferAffiliateAccessDto } from '../../../../../widget/data-access/src/lib/models/offer-affiliate-access.model';
import { OfferAffiliateAccessPayloadParamsDto } from '../models/offer-affiliate-access.model';

@Injectable()
export class OfferAffiliateAccessEditApi {
    constructor(private readonly rest: RestApiService) {}

    update(offerId: number, payload: OfferAffiliateAccessPayloadParamsDto): Observable<OfferAffiliateAccessDto> {
        return this.rest
            .put<ApiResponse<OfferAffiliateAccessDto>>('offer-affiliate-access-v2', payload, {
                urlParameters: { offerId }
            })
            .pipe(pluck('info', 'affiliate-access'));
    }
}
