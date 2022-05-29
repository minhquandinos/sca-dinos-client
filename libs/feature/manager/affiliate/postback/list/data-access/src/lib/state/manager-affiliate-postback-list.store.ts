import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { AffiliatePostbackListModel, AffiliatePostbackListQueryParamsDto } from '@scaleo/affiliate/postback/list/data-access';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';

export interface ManagerAffiliatePostbackListState extends BaseEntityState<AffiliatePostbackListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AffiliatePostbackListQueryParamsDto;
}

const initialManagerAffiliatePostbackListState = (): any =>
    createEntityInitialState<ManagerAffiliatePostbackListState>({
        data: {
            pagination: undefined
        },
        params: {
            page: 1,
            perPage: 10,
            sortField: 'id',
            sortDirection: 'desc',
            type: 'all',
            status: 'active'
        }
    });

@Injectable()
@StoreConfig({ name: 'manager-postback-list', resettable: true })
export class ManagerAffiliatePostbackListStore extends BaseEntityStore<ManagerAffiliatePostbackListState> {
    constructor() {
        super(initialManagerAffiliatePostbackListState());
    }
}
