import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AffiliateOfferListState, AffiliateOfferListStore } from './affiliate-offer-list.store';

@Injectable()
export class AffiliateOfferListQuery extends BaseEntityQuery<AffiliateOfferListState> {
    constructor(protected store: AffiliateOfferListStore) {
        super(store);
    }
}
