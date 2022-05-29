import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { createBaseInitialState } from '@scaleo/core/state/state';
import { CustomDateRangeService } from '@scaleo/platform/date/service';

import {
    AffiliateReportReferralListPayloadParamsDto,
    AffiliateReportReferralListQueryParamsDto
} from '../affiliate-report-referral-list.model';

export interface AffiliateReportReferralListState extends BaseEntityState<any> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: AffiliateReportReferralListQueryParamsDto;
    payload?: AffiliateReportReferralListPayloadParamsDto;
}

const initialState = (customDateRangeService: CustomDateRangeService) =>
    createBaseInitialState<AffiliateReportReferralListState>({
        data: {
            pagination: undefined
        },
        params: {
            page: 1,
            perPage: 10
        },
        payload: {
            rangeFrom: customDateRangeService.rangeFrom,
            rangeTo: customDateRangeService.rangeTo
        }
    });

@Injectable()
@StoreConfig({ name: 'affiliate-report-referral-list', resettable: true })
export class AffiliateReportReferralListStore extends BaseEntityStore<AffiliateReportReferralListState> {
    constructor(private readonly customDateRangeService: CustomDateRangeService) {
        super(initialState(customDateRangeService));
    }
}
