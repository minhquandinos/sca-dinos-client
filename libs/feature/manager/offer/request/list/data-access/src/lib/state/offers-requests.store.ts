import { Injectable } from '@angular/core';
import { EntityState, StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { OfferRequestStatusEnum } from '@scaleo/platform/list/access-data';

import { OfferRequestColumnSortEnum } from '../../../../component/src/lib/types/offer-request-columns.enum';
import { OfferRequestModel, OfferRequestQueryParamsModel } from '../models/offer-request.model';

export interface OfferRequestState extends EntityState<OfferRequestModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: OfferRequestQueryParamsModel;
}

const initialState: OfferRequestState = {
    data: {
        pagination: undefined
    },
    params: {
        page: 1,
        perPage: 20,
        sortField: OfferRequestColumnSortEnum.Date,
        sortDirection: 'desc',
        search: '',
        statuses: [OfferRequestStatusEnum.Pending],
        offers: [],
        affiliates: []
    }
};

@Injectable()
@StoreConfig({ name: 'offer-request' })
export class OffersRequestsStore extends BaseEntityStore<OfferRequestState> {
    constructor() {
        super(initialState);
    }
}
