import { guid } from '@datorama/akita';
import { Expose } from 'class-transformer';

import { DateRangeRequestModel, PageRequestModel } from '@scaleo/core/data';
import { referralCommissions } from '@scaleo/platform/referral/common';

export type AffiliateReportReferralListQueryParamsDto = PageRequestModel;

export type AffiliateReportReferralListPayloadParamsDto = DateRangeRequestModel;

export interface AffiliateReportReferralListDto {
    rate: number;
    referral: string;
    referral_commission: number;
}

export class AffiliateReportReferralListModel {
    @Expose()
    get id(): string {
        return guid();
    }

    @Expose()
    referral: string;

    @Expose()
    rate: number;

    @Expose()
    referral_commission?: number;

    @Expose()
    get referral_commission_source(): number[] {
        return referralCommissions;
    }
}
