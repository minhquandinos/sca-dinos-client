import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { OfferGoalListQueryParamsDto } from '@scaleo/feature/manager/offer/goal/list/api';
import { GoalStatusNameEnum } from '@scaleo/platform/list/access-data';

import { OfferGoalListModel } from '../models/offer-goals.model';

export interface OfferConfigGoalsState extends BaseEntityState<OfferGoalListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: OfferGoalListQueryParamsDto;
}

const initialState = createEntityInitialState<OfferConfigGoalsState>({
    data: {
        pagination: null
    },
    params: {
        status: GoalStatusNameEnum.Active,
        page: 1,
        perPage: 25,
        sortField: 'id',
        sortDirection: 'desc',
        search: ''
    }
});

@Injectable()
@StoreConfig({ name: 'offer-goals-collection' })
export class OfferGoalListStore extends BaseEntityStore<OfferConfigGoalsState> {
    constructor() {
        super(initialState);
    }
}
