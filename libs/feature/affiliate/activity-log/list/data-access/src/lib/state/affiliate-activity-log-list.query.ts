import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AffiliateActivityLogListStore, AffiliateActivityLogState } from './affiliate-activity-log-list.store';

@Injectable()
export class AffiliateActivityLogListQuery extends BaseEntityQuery<AffiliateActivityLogState> {
    constructor(protected store: AffiliateActivityLogListStore) {
        super(store);
    }
}
