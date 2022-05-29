import { CustomParamsActionIdEnum, CustomParamsActionTitleEnum } from '../../enums/platform-list/custom-params-actions.enum';

export const CUSTOM_PARAMS_ACTIONS_TRANSLATE_MAP = {
    [CustomParamsActionIdEnum.Revenue]: CustomParamsActionTitleEnum.Revenue,
    [CustomParamsActionIdEnum.Payout]: CustomParamsActionTitleEnum.Payout,
    [CustomParamsActionIdEnum.DailyCap]: CustomParamsActionTitleEnum.DailyCap,
    [CustomParamsActionIdEnum.WeeklyCap]: CustomParamsActionTitleEnum.WeeklyCap,
    [CustomParamsActionIdEnum.MonthlyCap]: CustomParamsActionTitleEnum.MonthlyCap,
    [CustomParamsActionIdEnum.TotalCap]: CustomParamsActionTitleEnum.TotalCap,
    [CustomParamsActionIdEnum.ThrottleRatePending]: CustomParamsActionTitleEnum.ThrottleRatePending,
    [CustomParamsActionIdEnum.ThrottleRateRejected]: CustomParamsActionTitleEnum.ThrottleRateRejected,
    [CustomParamsActionIdEnum.TrafficBackURL]: CustomParamsActionTitleEnum.TrafficBackURL,
    [CustomParamsActionIdEnum.ForceRedirect]: CustomParamsActionTitleEnum.ForceRedirect,
    [CustomParamsActionIdEnum.TrafficBackOffer]: CustomParamsActionTitleEnum.TrafficBackOffer
} as const;
