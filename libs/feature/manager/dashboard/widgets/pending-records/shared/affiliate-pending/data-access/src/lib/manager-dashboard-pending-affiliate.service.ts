import { Injectable } from '@angular/core';
import { Observable, pluck, switchMap, tap } from 'rxjs';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';

import { ManagerDashboardPendingAffiliateApi } from './manager-dashboard-pending-affiliate.api';
import { ManagerDashboardPendingAffiliateModel } from './manager-dashboard-pending-affiliate.model';
import { ManagerDashboardPendingAffiliateQuery } from './manager-dashboard-pending-affiliate.query';
import { ManagerDashboardPendingAffiliateState, ManagerDashboardPendingAffiliateStore } from './manager-dashboard-pending-affiliate.store';

@Injectable()
export class ManagerDashboardPendingAffiliateService extends BaseEntityService<ManagerDashboardPendingAffiliateState> {
    constructor(
        protected store: ManagerDashboardPendingAffiliateStore,
        protected query: ManagerDashboardPendingAffiliateQuery,
        private readonly api: ManagerDashboardPendingAffiliateApi
    ) {
        super(store, query);
    }

    index(): Observable<ManagerDashboardPendingAffiliateModel[]> {
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
