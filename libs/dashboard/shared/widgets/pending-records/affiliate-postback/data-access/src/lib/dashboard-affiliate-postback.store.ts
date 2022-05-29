import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';

import { DashboardPendingPostbackModel } from './dashboard-affiliate-postback.model';

export type DashboardAffiliatePostbackState = BaseEntityState<DashboardPendingPostbackModel>;

@Injectable()
@StoreConfig({ name: 'dashboard-affiliate-postback' })
export class DashboardAffiliatePostbackStore extends BaseEntityStore<DashboardAffiliatePostbackState> {
    constructor() {
        super();
    }
}
