import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { PageRequestModel, SortRequestModel, StatusRequestModel } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';

import { LeadsReceiveCampaignList } from '../models/leads-receive-campaign-list.model';

export type LeadsReceiveCampaignListQueryParamsModel = PageRequestModel &
    SortRequestModel &
    StatusRequestModel & {
        offers: number[];
    };

export interface LeadsReceiveCampaignListState extends BaseEntityState<LeadsReceiveCampaignList> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: LeadsReceiveCampaignListQueryParamsModel;
}

const createInitialState = createEntityInitialState<LeadsReceiveCampaignListState>({
    data: {
        pagination: undefined
    },
    params: {
        offers: [],
        page: 1,
        perPage: 25,
        sortDirection: 'desc',
        sortField: 'id',
        status: ''
    }
});

@Injectable()
@StoreConfig({ name: 'manager-leads-receive-campaigns', resettable: true })
export class ReceiveLeadsCampaignListStore extends BaseEntityStore<LeadsReceiveCampaignListState> {
    constructor() {
        super(createInitialState);
    }
}
