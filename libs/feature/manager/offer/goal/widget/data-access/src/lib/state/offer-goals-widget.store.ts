import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { guid } from '@datorama/akita';

import { SortByType } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { OfferGoalListModel } from '@scaleo/feature/manager/offer/goal/list/data-access';
import { GoalStatusNameEnum } from '@scaleo/platform/list/access-data';

export interface OfferGoalsWidgetState extends BaseEntityState<OfferGoalListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: {
        perPage: number;
        page: number;
        sortDirection: SortByType;
        sortField: string;
    };
}

const initialState = createEntityInitialState<OfferGoalsWidgetState>({
    data: {
        pagination: undefined
    },
    params: {
        perPage: 10,
        page: 1,
        sortDirection: 'desc',
        sortField: 'id'
    }
});

@Injectable()
export class OfferGoalsWidgetStore extends BaseEntityStore<OfferGoalsWidgetState> {
    constructor() {
        super(initialState, { name: `OfferGoalsWidget-${guid()}` });
    }
}
