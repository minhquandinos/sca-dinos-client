import { CurrencyEnum } from '@scaleo/platform/currency/models';

export enum ReferralCommissionsTypeEnum {
    Percentage = 1,
    Flat = 2
}

export enum ReferralCommissionSourceEnum {
    Revenue = 1,
    Payout = 2,
    Profit = 3
}

export interface ReferralsInterface {
    status: number;
    rate: number;
    referral: string;
    referral_commission: number;
    affiliate: string;
    base_amount: number;
    created: number;
    referred_affiliate: string;
    referral_commission_currency: CurrencyEnum;
    referral_commission_type: ReferralCommissionsTypeEnum;
}

export interface ReferralsInfoInterface {
    referral_id: number;
    referral_name: string;
    referral_firstname: string;
    referral_lastname: string;
    referral_created: number;
}
