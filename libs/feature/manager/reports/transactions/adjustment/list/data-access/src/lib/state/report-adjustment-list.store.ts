import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

import { AdjustmentListModel, AdjustmentLIstQueryParamsModel } from '../adjustments.interface';

export interface ReportAdjustmentListState extends BaseEntityState<AdjustmentListModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AdjustmentLIstQueryParamsModel;
}

const initialState = (customDateRangeService: CustomDateRangeService) =>
    createEntityInitialState<ReportAdjustmentListState>({
        data: {
            pagination: undefined
        },
        params: {
            status: '',
            page: 1,
            perPage: 10,
            rangeFrom: customDateRangeService.rangeFrom,
            rangeTo: customDateRangeService.rangeTo,
            sortDirection: 'desc',
            sortField: 'id'
        }
    });

@Injectable()
@StoreConfig({ name: 'manager-adjustment-list' })
export class ReportAdjustmentListStore extends BaseEntityStore<ReportAdjustmentListState> {
    constructor(private readonly customDateRangeService: CustomDateRangeService) {
        super(initialState(customDateRangeService));
    }
}
