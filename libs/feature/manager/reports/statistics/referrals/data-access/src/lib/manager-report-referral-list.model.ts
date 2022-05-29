import { guid } from '@datorama/akita';
import { Expose } from 'class-transformer';

import { BaseIdTitleModel, BaseObjectModel, DateRangeRequestModel, PageRequestModel } from '@scaleo/core/data';
import { referralCommissions } from '@scaleo/platform/referral/common';

export type ManagerReportReferralListQueryParamsDto = PageRequestModel;

export interface ManagerReportReferralListFiltersPayloadParamsDto {
    filters?: {
        affiliates: string;
    };
}

export interface ManagerReportReferralListFiltersPayloadParamsModel {
    filters: {
        affiliates?: BaseObjectModel<string, BaseIdTitleModel>[];
    };
}

export interface ManagerReportReferralListPayloadParamsModel
    extends DateRangeRequestModel,
        ManagerReportReferralListFiltersPayloadParamsModel {}

export interface ManagerReportReferralListPayloadParamsDto
    extends DateRangeRequestModel,
        ManagerReportReferralListFiltersPayloadParamsDto {}

export interface ManagerReportReferralListDto {
    affiliate: string;
    referred_affiliate: string;
    rate: number;
    referral_commission_source: number;
    base_amount: number;
    referral_commission?: number;
}

export class ManagerReportReferralListModel {
    @Expose()
    get id(): string {
        return guid();
    }

    @Expose()
    affiliate: string;

    @Expose()
    referred_affiliate: string;

    @Expose()
    rate: number;

    @Expose()
    get referral_commission_source(): number[] {
        return referralCommissions;
    }

    @Expose()
    base_amount: number;

    @Expose()
    referral_commission?: number;
}
