import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

import {
    ManagerDashboardPendingAdvertiserModel,
    ManagerDashboardPendingAdvertiserQueryParamsModel
} from './manager-dashboard-pending-advertiser.model';

export interface ManagerDashboardPendingAdvertiserState extends BaseEntityState<ManagerDashboardPendingAdvertiserModel> {
    data?: {
        total: number;
    };
    params?: ManagerDashboardPendingAdvertiserQueryParamsModel;
}

const initialState = createBaseInitialState<ManagerDashboardPendingAdvertiserState>({
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
@StoreConfig({ name: 'dashboard-pending-advertiser-list' })
export class ManagerDashboardPendingAdvertiserStore extends BaseEntityStore<ManagerDashboardPendingAdvertiserState> {
    constructor() {
        super(initialState);
    }
}
