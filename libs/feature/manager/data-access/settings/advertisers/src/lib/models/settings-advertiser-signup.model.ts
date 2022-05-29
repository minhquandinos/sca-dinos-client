import { Expose } from 'class-transformer';

import { BooleanEnum } from '@scaleo/core/data';
import {
    BaseSettingsSignUpDto,
    BaseSettingsSignUpPayloadModel,
    BaseSettingsSignUpViewModel
} from '@scaleo/feature/manager/common/settings';

export class SettingsAdvertiserSignupModel extends BaseSettingsSignUpViewModel {
    @Expose()
    allow_advertiser_signup: BooleanEnum = undefined;
}

export class AdvertiserSignUpPayloadModel extends BaseSettingsSignUpPayloadModel {
    @Expose()
    allow_advertiser_signup: BooleanEnum = undefined;
}

export interface AdvertiserSignupDto extends BaseSettingsSignUpDto {
    allow_advertiser_signup: BooleanEnum;
}
