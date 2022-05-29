import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { OfferLandingPageListQueryParamsDto } from '@scaleo/feature/manager/offer/landing-page/list/api';
import { OfferLandingPageStatusNameEnum } from '@scaleo/platform/list/access-data';

import { OfferLandingPageModel } from '../models';

export interface OfferLandingPageState extends BaseEntityState<OfferLandingPageModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: OfferLandingPageListQueryParamsDto;
}

export const initialState = createEntityInitialState<OfferLandingPageState>({
    data: {
        pagination: null
    },
    params: {
        status: OfferLandingPageStatusNameEnum.Active,
        page: 1,
        perPage: 10,
        sortField: 'id',
        sortDirection: 'asc',
        search: ''
    }
});

@Injectable()
@StoreConfig({ name: 'offer-landing-page' })
export class OfferLandingPageStore extends BaseEntityStore<OfferLandingPageState> {
    constructor() {
        super(initialState);
    }
}
