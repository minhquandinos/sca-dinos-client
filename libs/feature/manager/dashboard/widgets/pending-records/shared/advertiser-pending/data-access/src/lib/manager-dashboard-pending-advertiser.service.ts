import { Injectable } from '@angular/core';
import { Observable, pluck, switchMap, tap } from 'rxjs';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';

import { ManagerDashboardPendingAdvertiserApi } from './manager-dashboard-pending-advertiser.api';
import { ManagerDashboardPendingAdvertiserModel } from './manager-dashboard-pending-advertiser.model';
import { ManagerDashboardPendingAdvertiserQuery } from './manager-dashboard-pending-advertiser.query';
import {
    ManagerDashboardPendingAdvertiserState,
    ManagerDashboardPendingAdvertiserStore
} from './manager-dashboard-pending-advertiser.store';

@Injectable()
export class ManagerDashboardPendingAdvertiserService extends BaseEntityService<ManagerDashboardPendingAdvertiserState> {
    constructor(
        protected store: ManagerDashboardPendingAdvertiserStore,
        protected query: ManagerDashboardPendingAdvertiserQuery,
        private readonly api: ManagerDashboardPendingAdvertiserApi
    ) {
        super(store, query);
    }

    index(): Observable<ManagerDashboardPendingAdvertiserModel[]> {
        const observable = this.query.selectParams$().pipe(
            switchMap((queryParams) => this.api.index(queryParams)),
            tap(({ pagination: { total_count = undefined } = {} }) => {
                this.updateDataValue({ total: total_count });
            }),
            pluck('results'),
            tap((results) => {
                this.store.set(results);
            })
        );

        return this.observable(observable);
    }
}
