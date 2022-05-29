import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { DashboardOfferRequestState, DashboardOfferRequestStore } from './dashboard-offer-request.store';

@Injectable()
export class DashboardOfferRequestQuery extends BaseEntityQuery<DashboardOfferRequestState> {
    constructor(protected store: DashboardOfferRequestStore) {
        super(store);
    }
}
