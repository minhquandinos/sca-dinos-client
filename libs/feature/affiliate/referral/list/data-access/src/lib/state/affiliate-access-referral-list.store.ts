import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ReferralQueryParamsDto } from '@scaleo/affiliate/referral/data-access';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';
import { AffiliateAccessReferralModel } from '@scaleo/feature/affiliate/referral/list/data-access';

export interface AffiliateAccessReferralListState extends BaseEntityState<AffiliateAccessReferralModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: ReferralQueryParamsDto;
}

const initialState = createBaseInitialState<AffiliateAccessReferralListState>({
    data: {
        pagination: undefined
    },
    params: {
        status: '',
        page: 1,
        perPage: 10,
        sortDirection: 'desc',
        sortField: 'id'
    }
});

@Injectable()
@StoreConfig({ name: 'affiliate-referral-list', resettable: true })
export class AffiliateAccessReferralListStore extends BaseEntityStore<any> {
    constructor() {
        super(initialState);
    }
}
