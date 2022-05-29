import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ManagerReferralListState, ManagerReferralListStore } from './manager-referral-list.store';

@Injectable()
export class ManagerReferralListQuery extends BaseEntityQuery<ManagerReferralListState> {
    constructor(protected store: ManagerReferralListStore) {
        super(store);
    }
}
