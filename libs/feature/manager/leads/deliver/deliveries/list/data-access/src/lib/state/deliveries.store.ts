import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';

import { LeadsDeliveriesQueryParamsModel } from '../models/leads-deliveries.model';

export interface LeadsDeliveriesState extends BaseEntityState {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: LeadsDeliveriesQueryParamsModel;
}

const createInitialState = createEntityInitialState<LeadsDeliveriesState>({
    data: {
        pagination: undefined
    },
    params: {
        page: 1,
        perPage: 25,
        sortDirection: 'desc',
        sortField: 'id',
        status: '',
        campaigns: []
    }
});

@Injectable()
@StoreConfig({ name: 'deliveries', resettable: true })
export class DeliveriesStore extends BaseEntityStore<LeadsDeliveriesState> {
    constructor() {
        super(createInitialState);
    }
}
