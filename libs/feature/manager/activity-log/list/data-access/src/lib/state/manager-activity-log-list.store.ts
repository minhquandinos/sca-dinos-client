import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ActivityLogInterface } from '@scaleo/activity-log/common';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

import { ManagerActivityLogListModel } from '../models/manager-activity-log-list.model';

export interface ManagerActivityLogState extends BaseEntityState<ActivityLogInterface> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: ManagerActivityLogListModel;
}

const initialState = (date: CustomDateRangeService) => {
    const { rangeFrom, rangeTo } = date.rangeDate(CustomDateRangeTitleEnum.Last30Days);
    return createEntityInitialState<ManagerActivityLogState>({
        data: {
            pagination: undefined
        },
        params: {
            page: 1,
            perPage: 10,
            sortDirection: 'desc',
            sortField: 'added_timestamp',
            rangeFrom,
            rangeTo,
            role: '',
            managers: []
        }
    });
};

@Injectable()
@StoreConfig({ name: 'manager-activity-log-list', resettable: true })
export class ManagerActivityLogListStore extends BaseEntityStore<ManagerActivityLogState> {
    constructor(private readonly customDateRangeService: CustomDateRangeService) {
        super(initialState(customDateRangeService));
    }
}
