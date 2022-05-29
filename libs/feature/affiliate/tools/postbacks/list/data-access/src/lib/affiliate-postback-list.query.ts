import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AffiliatePostbackListState, AffiliatePostbackListStore } from './affiliate-postback-list.store';

@Injectable()
export class AffiliatePostbackListQuery extends BaseEntityQuery<AffiliatePostbackListState> {
    constructor(protected store: AffiliatePostbackListStore) {
        super(store);
    }
}
