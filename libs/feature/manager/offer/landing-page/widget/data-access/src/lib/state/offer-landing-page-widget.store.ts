import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { OfferLandingPageListQueryParamsDto } from '@scaleo/feature/manager/offer/landing-page/list/api';
import { OfferLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/list/data-access';

export interface OfferLandingPageWidgetState extends BaseEntityState<OfferLandingPageModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: OfferLandingPageListQueryParamsDto;
}

const initialState = createEntityInitialState<OfferLandingPageWidgetState>({
    data: {
        pagination: undefined
    },
    params: {
        page: 1,
        perPage: 10,
        sortDirection: 'asc',
        sortField: 'status_id'
    }
});

@Injectable()
export class OfferLandingPageWidgetStore extends BaseEntityStore<OfferLandingPageWidgetState> {
    constructor() {
        super(initialState, { name: `OfferLandingPageWidget-${guid()}` });
    }
}
