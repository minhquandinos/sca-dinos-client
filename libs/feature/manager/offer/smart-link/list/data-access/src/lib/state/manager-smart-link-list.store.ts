import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';

import { ManagerOfferSmartLinkListModel, ManagerOfferSmartLinkListQueryParamsModel } from '../manager-offer-smart-link-list.model';

export interface ManagerSmartLinksState extends BaseEntityState<ManagerOfferSmartLinkListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: ManagerOfferSmartLinkListQueryParamsModel;
}

const createInitialState = createEntityInitialState<ManagerSmartLinksState>({
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
@StoreConfig({ name: 'manager-smart-link-list', resettable: true })
export class ManagerSmartLinkListStore extends BaseEntityStore<ManagerSmartLinksState> {
    constructor() {
        super(createInitialState);
    }
}
