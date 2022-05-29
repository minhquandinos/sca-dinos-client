import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

import { ManagerAffiliatePostbackListState } from '../../../../../postback/list/data-access/src/lib/state/manager-affiliate-postback-list.store';
import { DomainListModel, DomainListQueryParamsDto } from '../domain.model';

export interface DomainListState extends BaseEntityState<DomainListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: DomainListQueryParamsDto;
}

const initialState = (): any =>
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
            status: PlatformListsStatusesNameEnum.Active
        }
    });

@Injectable()
@StoreConfig({ name: 'affiliate-domain-list' })
export class DomainListStore extends BaseEntityStore<DomainListState> {
    constructor() {
        super(initialState());
    }
}
