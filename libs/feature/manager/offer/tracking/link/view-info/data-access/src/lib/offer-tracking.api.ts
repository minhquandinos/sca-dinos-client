import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';
import { OfferTrackingInterface } from '@scaleo/offer/common';

@Injectable()
export class OfferTrackingApi {
    constructor(private readonly rest: RestApiService) {}

    public view(id: number): Observable<OfferTrackingInterface> {
        return this.rest.get<OfferTrackingInterface>('offer-tracking-settings', { urlParameters: { id } }).pipe(
            pluck('info', 'details'),
            map((data: OfferTrackingInterface) => ({
                ...data,
                offers_to_forward: data?.offers_to_forward === 0 ? null : +data.offers_to_forward
            }))
        );
    }
}
