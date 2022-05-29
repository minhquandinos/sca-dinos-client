import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AffiliateAccessReferralListState, AffiliateAccessReferralListStore } from './affiliate-access-referral-list.store';

@Injectable()
export class AffiliateAccessReferralListQuery extends BaseEntityQuery<AffiliateAccessReferralListState> {
    constructor(protected store: AffiliateAccessReferralListStore) {
        super(store);
    }
}
