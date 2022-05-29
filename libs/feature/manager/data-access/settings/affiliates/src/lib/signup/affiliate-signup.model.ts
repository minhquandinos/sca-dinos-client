import { Expose } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import {
    BaseSettingsSignUpDto,
    BaseSettingsSignUpPayloadModel,
    BaseSettingsSignUpViewModel
} from '@scaleo/feature/manager/common/settings';

export class AffiliateSignupModel extends BaseSettingsSignUpViewModel {
    @Expose()
    allow_affiliate_signup: BooleanEnum = undefined;

    @Expose()
    api_enabled_by_default: number = undefined;
}

export class AffiliateSignUpPayloadModel extends BaseSettingsSignUpPayloadModel {
    @Expose()
    allow_affiliate_signup: BooleanEnum = undefined;

    @Expose()
    api_enabled_by_default: number = undefined;
}

export interface AffiliateSignupDto extends BaseSettingsSignUpDto {
    api_enabled_by_default: number;
    allow_affiliate_signup: BooleanEnum;
}
