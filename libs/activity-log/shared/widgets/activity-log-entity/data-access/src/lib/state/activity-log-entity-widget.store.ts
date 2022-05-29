import { Injectable } from '@angular/core';
import { guid, StoreConfig } from '@datorama/akita';

import { ActivityLogInterface, ActivityLogRequestModel } from '@scaleo/activity-log/common';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';

export interface ActivityLogEntityWidgetState extends BaseEntityState<ActivityLogInterface> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: ActivityLogRequestModel;
}

const initialState = createEntityInitialState<ActivityLogEntityWidgetState>({
    data: {
        pagination: undefined
    },
    params: {
        sortField: 'added_timestamp',
        sortDirection: 'desc',
        page: 1,
        perPage: 10,
        role: ''
    }
});

@Injectable()
@StoreConfig({ name: `activity-log-entity-widget}`, resettable: true })
export class ActivityLogEntityWidgetStore extends BaseEntityStore<ActivityLogEntityWidgetState> {
    constructor() {
        super(initialState, { name: `ActivityLogEntityWidget-${guid()}` });
    }
}
