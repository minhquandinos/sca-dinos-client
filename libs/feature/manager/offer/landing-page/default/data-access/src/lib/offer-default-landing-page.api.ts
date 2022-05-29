import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiResponse, RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { OfferDetailQuery } from '@scaleo/feature/manager/offer/detail/data-access';

import { OfferDefaultLandingPageModel } from './offer-default-landing-page.model';

@Injectable({
    providedIn: 'root'
})
export class OfferDefaultLandingPageApi {
    constructor(private readonly rest: RestApiService, private readonly offerDetailQuery: OfferDetailQuery) {}

    get getDefaultOfferUrl$(): Observable<OfferDefaultLandingPageModel> {
        const options: RestApiOptions = {
            urlParameters: {
                offerId: this.offerDetailQuery.id
            }
        };
        return this.rest
            .get<ApiResponse<OfferDefaultLandingPageModel>>('default-offer-url', options)
            .pipe(pluck('info', 'default-offer-url'));
    }
}
