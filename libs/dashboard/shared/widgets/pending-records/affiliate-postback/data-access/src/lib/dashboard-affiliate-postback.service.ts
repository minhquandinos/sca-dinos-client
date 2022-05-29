import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';

import { DashboardAffiliatePostbackApi } from './dashboard-affiliate-postback.api';
import { DashboardPendingPostbackModel } from './dashboard-affiliate-postback.model';
import { DashboardAffiliatePostbackQuery } from './dashboard-affiliate-postback.query';
import { DashboardAffiliatePostbackState, DashboardAffiliatePostbackStore } from './dashboard-affiliate-postback.store';

@Injectable()
export class DashboardAffiliatePostbackService extends BaseEntityService<DashboardAffiliatePostbackState> {
    constructor(
        protected store: DashboardAffiliatePostbackStore,
        protected query: DashboardAffiliatePostbackQuery,
        private readonly api: DashboardAffiliatePostbackApi
    ) {
        super(store, query);
    }

    index(): Observable<DashboardPendingPostbackModel[]> {
        const observable = this.api.index().pipe(
            tap((items) => {
                this.store.set(items);
            })
        );

        return this.observable(observable);
    }
}
