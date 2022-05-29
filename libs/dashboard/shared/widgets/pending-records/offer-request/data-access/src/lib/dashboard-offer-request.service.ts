import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';

import { DashboardOfferRequestApi } from './dashboard-offer-request.api';
import { DashboardOfferRequestQuery } from './dashboard-offer-request.query';
import { DashboardOfferRequestState, DashboardOfferRequestStore } from './dashboard-offer-request.store';

@Injectable()
export class DashboardOfferRequestService extends BaseEntityService<DashboardOfferRequestState> {
    constructor(
        protected store: DashboardOfferRequestStore,
        protected query: DashboardOfferRequestQuery,
        private readonly api: DashboardOfferRequestApi
    ) {
        super(store, query);
    }

    index(): Observable<DashboardOfferRequestState[]> {
        const observable = this.api.index().pipe(
            tap((items) => {
                this.store.set(items);
            })
        );

        return this.observable(observable);
    }
}
