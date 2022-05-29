import { Expose } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { ReferralCommissionSourceEnum, ReferralCommissionsTypeEnum } from '@scaleo/platform/referral/common';

export class SettingsAffiliateGeneralModel {
    @Expose()
    general_see_pending_conv: BooleanEnum = BooleanEnum.False;

    @Expose()
    general_see_rejected_conv: BooleanEnum = BooleanEnum.False;

    @Expose()
    general_see_trash_conv: BooleanEnum = BooleanEnum.False;

    @Expose()
    referral_program: BooleanEnum = BooleanEnum.False;

    @Expose()
    referral_commission_type: ReferralCommissionsTypeEnum = undefined;

    @Expose()
    referral_commission: number = undefined;

    @Expose()
    referral_commission_source: ReferralCommissionSourceEnum = undefined;

    @Expose()
    referral_commission_currency?: CurrencyEnum = undefined;

    @Expose()
    auto_approve_postbacks: BooleanEnum = BooleanEnum.True;
}
