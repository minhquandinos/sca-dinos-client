import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { OfferAffiliateAccessApi } from '../api/offer-affiliate-access.api';
import { OfferAffiliateAccessModel } from '../models/offer-affiliate-access.model';
import { OfferAffiliateAccessWidgetStore } from './offer-affiliate-access-widget.state';

@Injectable()
export class OfferAffiliateAccessWidgetService {
    constructor(private readonly api: OfferAffiliateAccessApi, private readonly store: OfferAffiliateAccessWidgetStore) {}

    index(offerId: number) {
        return this.api.index(offerId).pipe(
            tap((response) => {
                this.store.update(response);
            })
        );
    }

    update(state: OfferAffiliateAccessModel): void {
        this.store.update(state);
    }
}
