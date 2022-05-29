import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ManagerAffiliateReferralWidgetState, ManagerAffiliateReferralWidgetStore } from './manager-affiliate-referral-widget.store';

@Injectable()
export class ManagerAffiliateReferralWidgetQuery extends BaseEntityQuery<ManagerAffiliateReferralWidgetState> {
    constructor(protected store: ManagerAffiliateReferralWidgetStore) {
        super(store);
    }
}
