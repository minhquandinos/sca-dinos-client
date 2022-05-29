import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreConfig } from '@datorama/akita';

import { ProfileQuery } from '@scaleo/account/data-access';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';

import { AdvertiserOfferListModel, AffiliateOfferListQueryParamsModel } from '../models/advertiser-offer-list.model';

export interface AdvertiserOfferListState extends BaseEntityState<AdvertiserOfferListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AffiliateOfferListQueryParamsModel;
}

const createInitialState = (route: ActivatedRoute) => {
    const queryParamPage = route?.snapshot?.queryParams?.page;

    const page = queryParamPage || 1;

    return createEntityInitialState<AdvertiserOfferListState>({
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
            search: ''
        }
    });
};

@Injectable()
// @StoreConfig({ name: 'advertiser-offer-list', resettable: true })
export class AdvertiserOfferListStore extends BaseEntityStore<AdvertiserOfferListState> {
    constructor(private route: ActivatedRoute, private readonly profileQuery: ProfileQuery) {
        super(createInitialState(route), { name: `${profileQuery.role}-offer-list` });
    }
}
