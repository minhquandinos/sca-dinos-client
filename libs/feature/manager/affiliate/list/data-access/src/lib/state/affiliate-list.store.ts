import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityInitialState, BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { AdvertiserListQueryParamsModel } from '@scaleo/feature/manager/advertiser/list/data-access';

import { AffiliateListModel } from '../affiliate-list.model';

export interface AffiliateListState extends BaseEntityState<AffiliateListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AdvertiserListQueryParamsModel;
}

const createInitialState = (): BaseEntityInitialState<AffiliateListState> => ({
    data: {
        pagination: undefined
    },
    params: {
        page: 1,
        perPage: 10,
        sortDirection: 'desc',
        sortField: 'created',
        status: 'status'
    },
    payload: undefined
});

@Injectable()
@StoreConfig({ name: 'affiliates', resettable: true })
export class AffiliateListStore extends BaseEntityStore<AffiliateListState> {
    constructor() {
        super(createInitialState());
    }
}
