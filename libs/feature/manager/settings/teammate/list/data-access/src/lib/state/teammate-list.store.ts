import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';

import { TeammateListModel, TeammateListQueryParamsModel } from '../teammate-list.model';

export interface TeammateListState extends BaseEntityState<TeammateListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: TeammateListQueryParamsModel;
}

const initialState = createBaseInitialState<TeammateListState>({
    data: {
        pagination: undefined
    },
    params: {
        page: 1,
        perPage: 10,
        sortField: 'id',
        sortDirection: 'desc',
        type: 'all',
        status: '',
        role: ''
    }
});

@Injectable()
@StoreConfig({ name: 'teammate-list' })
export class TeammateListStore extends BaseEntityStore<TeammateListState> {
    constructor() {
        super(initialState);
    }
}
