import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { persistState, StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

import { ManagerOfferListModel, ManagerOfferListQueryParamsModel } from '../models/manager-offer-list.model';

export interface ManagerOfferListState extends BaseEntityState<ManagerOfferListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: ManagerOfferListQueryParamsModel;
}

const createInitialState = (route: ActivatedRoute) => {
    const pagePath = route.snapshot.data?.pagePath;
    const queryParamPage = route?.snapshot?.queryParams?.page;

    const page = queryParamPage || 1;
    const onlyFeatured = pagePath === 'featured' ? 'yes' : undefined;

    return createEntityInitialState<ManagerOfferListState>({
        data: {
            pagination: undefined
        },
        params: {
            status: PlatformListsStatusesNameEnum.EmptyStatus,
            sortField: 'id',
            sortDirection: 'desc',
            page,
            perPage: 10,
            countries: [],
            tags: [],
            goalsTypes: [],
            advertisers: [],
            visible_type: [],
            search: '',
            onlyFeatured
        }
    });
};

@Injectable()
@StoreConfig({ name: 'manager-offer-list', resettable: true })
export class ManagerOfferListStore extends BaseEntityStore<ManagerOfferListState> {
    constructor(private route: ActivatedRoute) {
        super(createInitialState(route));
    }
}

export const managerOfferListStorage = persistState({
    include: ['manager-offer-list'],
    key: 'scaleo__managerOfferListStore',
    preStorageUpdate(storeName, state: ManagerOfferListState) {
        if (storeName === 'manager-offer-list') {
            return {
                status: state.params?.status
            };
        }

        return state;
    },
    preStoreUpdate(storeName, state, initialState) {
        if (storeName === 'manager-offer-list') {
            return {
                ...initialState,
                params: {
                    ...initialState.params,
                    status: state?.status
                }
            };
        }

        return state;
    }
});
