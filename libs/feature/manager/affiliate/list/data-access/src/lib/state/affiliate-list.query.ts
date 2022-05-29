import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AffiliateListState, AffiliateListStore } from './affiliate-list.store';

@Injectable()
export class AffiliateListQuery extends BaseEntityQuery<AffiliateListState> {
    constructor(protected store: AffiliateListStore) {
        super(store);
    }
}
