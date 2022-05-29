import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { ManagerReferralModel } from '@scaleo/feature/manager/affiliate/referral/data-access';

export interface ManagerAffiliateReferralWidgetState extends BaseEntityState<ManagerReferralModel> {
    data?: {
        totalCount: number;
    };
}

const initialState = createEntityInitialState<ManagerAffiliateReferralWidgetState>({
    data: {
        totalCount: 0
    },
    params: {
        status: 'active',
        sortField: 'id',
        sortDirection: 'desc'
    }
});

@Injectable()
@StoreConfig({ name: 'affiliate-referral-widget', resettable: true })
export class ManagerAffiliateReferralWidgetStore extends BaseEntityStore<ManagerAffiliateReferralWidgetState> {
    constructor() {
        super(initialState);
    }
}
