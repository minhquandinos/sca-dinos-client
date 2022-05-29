import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

import {
    ManagerDashboardPendingAffiliateModel,
    ManagerDashboardPendingAffiliateQueryParamsModel
} from './manager-dashboard-pending-affiliate.model';

export interface ManagerDashboardPendingAffiliateState extends BaseEntityState<ManagerDashboardPendingAffiliateModel> {
    data?: {
        total: number;
    };
    params?: ManagerDashboardPendingAffiliateQueryParamsModel;
}

const initialState = createBaseInitialState<ManagerDashboardPendingAffiliateState>({
    data: {
        total: 0
    },
    params: {
        status: PlatformListsStatusesNameEnum.Pending,
        sortField: 'id',
        sortDirection: 'desc',
        perPage: 15
    }
});

@Injectable()
@StoreConfig({ name: 'dashboard-pending-affiliate-list' })
export class ManagerDashboardPendingAffiliateStore extends BaseEntityStore<ManagerDashboardPendingAffiliateState> {
    constructor() {
        super(initialState);
    }
}
