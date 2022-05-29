import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

import {
    ManagerReportReferralListPayloadParamsModel,
    ManagerReportReferralListQueryParamsDto
} from '../manager-report-referral-list.model';

export interface ManagerReportReferralListState extends BaseEntityState<any> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: ManagerReportReferralListQueryParamsDto;
    payload?: ManagerReportReferralListPayloadParamsModel;
}

const initialState = (customDateRangeService: CustomDateRangeService) =>
    createBaseInitialState<ManagerReportReferralListState>({
        data: {
            pagination: undefined
        },
        params: {
            page: 1,
            perPage: 10
        },
        payload: {
            rangeFrom: customDateRangeService.rangeFrom,
            rangeTo: customDateRangeService.rangeTo,
            filters: undefined
        }
    });

@Injectable()
@StoreConfig({ name: 'manager-report-referral-list', resettable: true })
export class ManagerReportReferralListStore extends BaseEntityStore<ManagerReportReferralListState> {
    constructor(private readonly customDateRangeService: CustomDateRangeService) {
        super(initialState(customDateRangeService));
    }
}
