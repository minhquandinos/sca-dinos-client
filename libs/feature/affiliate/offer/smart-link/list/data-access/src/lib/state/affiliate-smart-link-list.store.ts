import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';

import { AffiliateOfferSmartLinkListModel, AffiliateOfferSmartLinkListQueryParamsModel } from '../affiliate-offer-smart-link-list.model';

export interface AffiliateSmartLinksState extends BaseEntityState<AffiliateOfferSmartLinkListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AffiliateOfferSmartLinkListQueryParamsModel;
}

const createInitialState = createEntityInitialState<AffiliateSmartLinksState>({
    data: {
        pagination: undefined
    },
    params: {
        page: 1,
        perPage: 25,
        sortDirection: 'desc',
        sortField: 'id',
        status: ''
    }
});

@Injectable()
@StoreConfig({ name: 'affiliate-smart-link-list', resettable: true })
export class AffiliateSmartLinkListStore extends BaseEntityStore<AffiliateSmartLinksState> {
    constructor() {
        super(createInitialState);
    }
}
