import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ManagerOfferListState, ManagerOfferListStore } from './manager-offer-list.store';

@Injectable()
export class ManagerOfferListQuery extends BaseEntityQuery<ManagerOfferListState> {
    constructor(protected store: ManagerOfferListStore) {
        super(store);
    }
}
