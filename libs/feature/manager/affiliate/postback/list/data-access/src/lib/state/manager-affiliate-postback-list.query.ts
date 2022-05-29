import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ManagerAffiliatePostbackListState, ManagerAffiliatePostbackListStore } from './manager-affiliate-postback-list.store';

@Injectable()
export class ManagerAffiliatePostbackListQuery extends BaseEntityQuery<ManagerAffiliatePostbackListState> {
    constructor(protected store: ManagerAffiliatePostbackListStore) {
        super(store);
    }
}
