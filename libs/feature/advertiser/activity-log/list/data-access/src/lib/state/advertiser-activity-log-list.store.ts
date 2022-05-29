import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ActivityLogInterface } from '@scaleo/activity-log/common';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

import { AdvertiserActivityLogListModel } from '../models/advertiser-activity-log-list.model';

export interface AdvertiserActivityLogState extends BaseEntityState<ActivityLogInterface> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AdvertiserActivityLogListModel;
}

const initialState = (customDateRangeService: CustomDateRangeService) =>
    createEntityInitialState<AdvertiserActivityLogState>({
        data: {
            pagination: undefined
        },
        params: {
            page: 1,
            perPage: 10,
            sortDirection: 'desc',
            sortField: 'added_timestamp',
            rangeFrom: customDateRangeService.rangeFrom,
            rangeTo: customDateRangeService.rangeTo
        }
    });

@Injectable()
@StoreConfig({ name: 'advertiser-activity-log-list', resettable: true })
export class AdvertiserActivityLogListStore extends BaseEntityStore<AdvertiserActivityLogState> {
    constructor(private readonly customDateRangeService: CustomDateRangeService) {
        super(initialState(customDateRangeService));
    }
}
