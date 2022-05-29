import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { ManagerOfferCreativeListQueryParamsDto } from '@scaleo/feature/manager/offer/creative/list/api';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

import { ManagerOfferCreativeModel } from '../models/offer-creatives.model';

export interface OfferConfigCreativesState extends BaseEntityState<ManagerOfferCreativeModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: ManagerOfferCreativeListQueryParamsDto;
}

export const initialState = createEntityInitialState<OfferConfigCreativesState>({
    data: {
        pagination: null
    },
    params: {
        status: PlatformListsStatusesNameEnum.Active,
        page: 1,
        perPage: 25,
        sortField: 'status',
        sortDirection: 'asc',
        search: ''
    }
});

@StoreConfig({ name: 'manager-offer-config-creatives', resettable: true })
export class OfferConfigCreativesStore extends BaseEntityStore<OfferConfigCreativesState> {
    constructor() {
        super(initialState);
    }
}
