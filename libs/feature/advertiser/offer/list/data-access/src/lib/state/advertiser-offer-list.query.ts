import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AdvertiserOfferListState, AdvertiserOfferListStore } from './advertiser-offer-list.store';

@Injectable()
export class AdvertiserOfferListQuery extends BaseEntityQuery<AdvertiserOfferListState> {
    constructor(protected store: AdvertiserOfferListStore) {
        super(store);
    }
}
