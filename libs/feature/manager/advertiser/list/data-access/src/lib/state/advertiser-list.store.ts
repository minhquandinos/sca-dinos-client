import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';

import { AdvertiserListModel, AdvertiserListQueryParamsModel } from '../advertiser-list.model';

export interface AdvertiserListState extends BaseEntityState<AdvertiserListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AdvertiserListQueryParamsModel;
}

export const initialAdvertiserListState = (): any =>
    createEntityInitialState<AdvertiserListState>({
        data: {
            pagination: undefined
        },
        params: {
            page: 1,
            perPage: 10,
            sortDirection: 'desc',
            sortField: 'created',
            status: '',
            search: ''
        }
    });

@Injectable()
@StoreConfig({ name: 'manager-advertisers', resettable: true })
export class AdvertiserListStore extends BaseEntityStore<AdvertiserListState> {
    constructor() {
        super(initialAdvertiserListState());
    }
}
