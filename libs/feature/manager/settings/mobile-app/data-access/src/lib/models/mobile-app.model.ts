import { BooleanEnum } from '@scaleo/core/data';

import { MobileAppControlEnum } from '../enum/mobile-app.enum';

export interface SettingsMobileAppModel {
    [MobileAppControlEnum.Managers]: BooleanEnum;
    [MobileAppControlEnum.Affiliates]: BooleanEnum;
    [MobileAppControlEnum.Advertisers]: BooleanEnum;
}
