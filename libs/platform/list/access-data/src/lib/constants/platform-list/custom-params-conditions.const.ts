import { CustomParamsConditionsIdEnum, CustomParamsConditionsTranslateEnum } from '../../enums/platform-list';

export const CUSTOM_PARAMS_CONDITIONS_TRANSLATE_MAP = {
    [CustomParamsConditionsIdEnum.Geo]: CustomParamsConditionsTranslateEnum.Geo,
    [CustomParamsConditionsIdEnum.DeviceType]: CustomParamsConditionsTranslateEnum.DeviceType,
    [CustomParamsConditionsIdEnum.ConnectionType]: CustomParamsConditionsTranslateEnum.ConnectionType,
    [CustomParamsConditionsIdEnum.MobileOperator]: CustomParamsConditionsTranslateEnum.MobileOperator,
    [CustomParamsConditionsIdEnum.DeviceOS]: CustomParamsConditionsTranslateEnum.DeviceOS,
    [CustomParamsConditionsIdEnum.DeviceOSVersion]: CustomParamsConditionsTranslateEnum.DeviceOSVersion,
    [CustomParamsConditionsIdEnum.DeviceBrand]: CustomParamsConditionsTranslateEnum.DeviceBrand,
    [CustomParamsConditionsIdEnum.DeviceModel]: CustomParamsConditionsTranslateEnum.DeviceModel,
    [CustomParamsConditionsIdEnum.Browser]: CustomParamsConditionsTranslateEnum.Browser,
    [CustomParamsConditionsIdEnum.Language]: CustomParamsConditionsTranslateEnum.Language,
    [CustomParamsConditionsIdEnum.AffiliateSub1]: CustomParamsConditionsTranslateEnum.AffiliateSub1,
    [CustomParamsConditionsIdEnum.AffiliateSub2]: CustomParamsConditionsTranslateEnum.AffiliateSub2,
    [CustomParamsConditionsIdEnum.AffiliateSub3]: CustomParamsConditionsTranslateEnum.AffiliateSub3,
    [CustomParamsConditionsIdEnum.AffiliateSub4]: CustomParamsConditionsTranslateEnum.AffiliateSub4,
    [CustomParamsConditionsIdEnum.AffiliateSub5]: CustomParamsConditionsTranslateEnum.AffiliateSub5
} as const;
