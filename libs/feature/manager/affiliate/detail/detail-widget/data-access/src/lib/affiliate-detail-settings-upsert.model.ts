import { ApiAccessStatusEnum } from '@scaleo/shared/components';

export interface AffiliateDetailSettingsUpsertModel {
    api_status: ApiAccessStatusEnum;
    referred_by: number;
    referral_commission: number;
}
