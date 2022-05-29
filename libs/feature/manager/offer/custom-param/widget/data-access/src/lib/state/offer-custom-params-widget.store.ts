import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';
import { OfferCustomParamListModel } from '@scaleo/feature/manager/offer/custom-param/common';
import { OfferCustomParamListQueryParamsDto } from '@scaleo/feature/manager/offer/custom-param/list/api';
import { OfferLandingPageStatusNameEnum } from '@scaleo/platform/list/access-data';

export interface OfferCustomParamsWidgetState extends BaseEntityState<OfferCustomParamListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: OfferCustomParamListQueryParamsDto;
}

const initialState = createBaseInitialState<OfferCustomParamsWidgetState>({
    data: {
        pagination: undefined
    },
    params: {
        perPage: 10,
        status: OfferLandingPageStatusNameEnum.Active,
        page: 1,
        sortDirection: 'desc',
        sortField: 'id'
    }
});

@Injectable()
export class OfferCustomParamsWidgetStore extends BaseEntityStore<OfferCustomParamsWidgetState> {
    constructor() {
        super(initialState, { name: `OfferCustomParamsWidget-${guid()}` });
    }
}
