import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { DashboardAffiliatePostbackState, DashboardAffiliatePostbackStore } from './dashboard-affiliate-postback.store';

@Injectable()
export class DashboardAffiliatePostbackQuery extends BaseEntityQuery<DashboardAffiliatePostbackState> {
    constructor(protected store: DashboardAffiliatePostbackStore) {
        super(store);
    }
}
