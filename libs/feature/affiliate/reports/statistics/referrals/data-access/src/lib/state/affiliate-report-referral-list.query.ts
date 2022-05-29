import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AffiliateReportReferralListState, AffiliateReportReferralListStore } from './affiliate-report-referral-list.store';

@Injectable()
export class AffiliateReportReferralListQuery extends BaseEntityQuery<AffiliateReportReferralListState> {
    constructor(protected store: AffiliateReportReferralListStore) {
        super(store);
    }
}
