import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ReferralQueryParamsDto } from '@scaleo/affiliate/referral/data-access';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';
import { ManagerReferralModel } from '@scaleo/feature/manager/affiliate/referral/data-access';

export interface ManagerReferralListState extends BaseEntityState<ManagerReferralModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: ReferralQueryParamsDto;
}

const initialState = createBaseInitialState<ManagerReferralListState>({
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
@StoreConfig({ name: 'manager-affiliate-referral-list', resettable: true })
export class ManagerReferralListStore extends BaseEntityStore<any> {
    constructor() {
        super(initialState);
    }
}
