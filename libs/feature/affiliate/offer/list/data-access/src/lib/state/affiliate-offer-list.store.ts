import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreConfig } from '@datorama/akita';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { YesEnum } from '@scaleo/offer/common';
import { PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';
import { Filter2Interface } from '@scaleo/shared/services/filters';

import { AffiliateOfferListModel, AffiliateOfferListQueryParamsModel } from '../models/affiliate-offer-list.model';

export interface AffiliateOfferListState extends BaseEntityState<AffiliateOfferListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AffiliateOfferListQueryParamsModel;
}

const createInitialState = (route: ActivatedRoute) => {
    const pagePath = route.snapshot.data?.pagePath;
    const queryParamPage = route?.snapshot?.queryParams?.page;

    const page = queryParamPage || 1;
    const onlyFeatured = pagePath === 'featured' ? 'yes' : undefined;
    const onlyMine = pagePath === 'my' ? 'yes' : undefined;

    return createEntityInitialState<AffiliateOfferListState>({
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
            search: '',
            availability: '',
            onlyMine,
            onlyFeatured
        }
    });
};

@Injectable()
@StoreConfig({ name: 'manager-offer-list', resettable: true })
export class AffiliateOfferListStore extends BaseEntityStore<AffiliateOfferListState> {
    constructor(private route: ActivatedRoute) {
        super(createInitialState(route));
    }
}
