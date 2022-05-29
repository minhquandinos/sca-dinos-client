import { guid } from '@datorama/akita';
import { Expose } from 'class-transformer';

import { ReferralStatusType } from '@scaleo/affiliate/referral/data-access';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';

export interface ManagerReferralDto {
    status: ReferralStatusType;
    rate: number;
    referral_commission: number;
    affiliate: string;
    base_amount: number;
    created: number;
    referred_affiliate: string;
}

export class ManagerReferralModel {
    @Expose()
    get id(): string {
        return guid();
    }

    @Expose()
    status: ReferralStatusType = undefined;

    @Expose()
    rate: number = undefined;

    @Expose()
    referral_commission: number = undefined;

    @Expose()
    affiliate: string = undefined;

    @Expose()
    base_amount: number = undefined;

    @Expose()
    created: number = undefined;

    @Expose()
    referred_affiliate: string = undefined;

    @Expose()
    referral_commission_currency: CurrencyEnum = undefined;

    @Expose()
    referral_commission_type: ReferralCommissionsTypeEnum = undefined;
}
