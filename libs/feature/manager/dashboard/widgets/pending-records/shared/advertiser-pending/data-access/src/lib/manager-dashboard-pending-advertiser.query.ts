import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import {
    ManagerDashboardPendingAdvertiserState,
    ManagerDashboardPendingAdvertiserStore
} from './manager-dashboard-pending-advertiser.store';

@Injectable()
export class ManagerDashboardPendingAdvertiserQuery extends BaseEntityQuery<ManagerDashboardPendingAdvertiserState> {
    constructor(protected store: ManagerDashboardPendingAdvertiserStore) {
        super(store);
    }
}
