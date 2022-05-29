import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ManagerDashboardPendingAffiliateState, ManagerDashboardPendingAffiliateStore } from './manager-dashboard-pending-affiliate.store';

@Injectable()
export class ManagerDashboardPendingAffiliateQuery extends BaseEntityQuery<ManagerDashboardPendingAffiliateState> {
    constructor(protected store: ManagerDashboardPendingAffiliateStore) {
        super(store);
    }
}
