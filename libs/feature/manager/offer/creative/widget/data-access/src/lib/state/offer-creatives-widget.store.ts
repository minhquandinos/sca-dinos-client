import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';
import { ManagerOfferCreativeListQueryParamsDto } from '@scaleo/feature/manager/offer/creative/list/api';
import { ManagerOfferCreativeModel } from '@scaleo/feature/manager/offer/creative/list/data-access';

export interface OfferCreativesWidgetState extends BaseEntityState<ManagerOfferCreativeModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: ManagerOfferCreativeListQueryParamsDto;
}

const initialState = createBaseInitialState<OfferCreativesWidgetState>({
    data: {
        pagination: undefined
    },
    params: {
        perPage: 10,
        page: 1,
        sortDirection: 'asc',
        sortField: 'status'
    }
});

@Injectable()
export class OfferCreativesWidgetStore extends BaseEntityStore<OfferCreativesWidgetState> {
    constructor() {
        super(initialState, { name: `OfferCreativeWidget-${guid()}`, resettable: true });
    }
}
