import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { OfferCustomParamListQueryParamsDto } from '@scaleo/feature/manager/offer/custom-param/list/api';
import { OfferLandingPageModel } from '@scaleo/feature/manager/offer/landing-page/list/data-access';
import { BaseStatusNameEnum } from '@scaleo/platform/list/access-data';

export interface OfferCustomParamsState extends BaseEntityState<OfferLandingPageModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: OfferCustomParamListQueryParamsDto;
}

export const initialState = createEntityInitialState<OfferCustomParamsState>({
    data: {
        pagination: null
    },
    params: {
        status: BaseStatusNameEnum.Active,
        page: 1,
        perPage: 25,
        sortField: 'id',
        sortDirection: 'desc'
    }
});

@Injectable()
@StoreConfig({ name: 'offer-custom-params' })
export class OfferCustomParamListStore extends BaseEntityStore<OfferCustomParamsState> {
    constructor() {
        super(initialState);
    }
}
