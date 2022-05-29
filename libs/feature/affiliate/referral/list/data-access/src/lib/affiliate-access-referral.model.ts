import { guid } from '@datorama/akita';
import { Expose } from 'class-transformer';

import { ReferralStatusType } from '@scaleo/affiliate/referral/data-access';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';

export interface AffiliateAccessReferralDto {
    status: ReferralStatusType;
    rate: number;
    referral_commission: number;
    referral: string;
    created: number;
}

export class AffiliateAccessReferralModel {
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
    referral: string = undefined;

    @Expose()
    created: number = undefined;

    @Expose()
    referral_commission_currency: CurrencyEnum = undefined;

    @Expose()
    referral_commission_type: ReferralCommissionsTypeEnum = undefined;
}
