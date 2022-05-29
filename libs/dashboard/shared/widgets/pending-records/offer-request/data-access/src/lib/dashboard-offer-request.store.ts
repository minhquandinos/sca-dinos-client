import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';

import { DashboardOfferRequestModel } from './dashboard-offer-request.model';

export type DashboardOfferRequestState = BaseEntityState<DashboardOfferRequestModel>;

@Injectable()
@StoreConfig({ name: 'dashboard-offer-request' })
export class DashboardOfferRequestStore extends BaseEntityStore<DashboardOfferRequestState> {
    constructor() {
        super();
    }
}
