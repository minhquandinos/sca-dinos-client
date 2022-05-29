import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ManagerDuplicateOfferApi } from './manager-duplicate-offer.api';

@Injectable()
export class ManagerDuplicateOfferService {
    constructor(private readonly api: ManagerDuplicateOfferApi) {}

    duplicate(offerId: number): Observable<number> {
        return this.api.duplicate(offerId);
    }
}
