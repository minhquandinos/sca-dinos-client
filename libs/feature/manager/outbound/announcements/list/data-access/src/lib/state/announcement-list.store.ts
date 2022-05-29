import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';

import { AnnouncementsListModel, AnnouncementsListQueryParamsModel } from '../announcement-list.model';

export interface AnnouncementListState extends BaseEntityState<AnnouncementsListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AnnouncementsListQueryParamsModel;
}

const initialState = createBaseInitialState<AnnouncementListState>({
    data: {
        pagination: undefined
    },
    params: {
        status: '',
        page: 1,
        perPage: 10,
        sortField: 'created',
        sortDirection: 'desc'
    }
});

@Injectable()
@StoreConfig({ name: 'announcement-list' })
export class AnnouncementListStore extends BaseEntityStore<AnnouncementListState> {
    constructor() {
        super(initialState);
    }
}
