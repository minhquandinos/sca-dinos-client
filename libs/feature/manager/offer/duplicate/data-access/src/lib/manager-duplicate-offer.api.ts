import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiService } from '@scaleo/core/rest-api/service';

@Injectable()
export class ManagerDuplicateOfferApi {
    constructor(private readonly rest: RestApiService) {}

    duplicate(offerId: number): Observable<number> {
        return this.rest.get<number>('offer-duplicate', { urlParameters: { offerId } }).pipe(pluck('info', 'new_offer_id'));
    }
}
