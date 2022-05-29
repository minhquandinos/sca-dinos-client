import { TrafficDistributionMethodEnum, TrafficDistributionMethodTranslateEnum } from '../../enums/platform-list';

export const TRAFFIC_DISTRIBUTION_METHODS_TRANSLATE_MAP = Object.freeze({
    [TrafficDistributionMethodEnum.None]: TrafficDistributionMethodTranslateEnum.None,
    [TrafficDistributionMethodEnum.ABTesting]: TrafficDistributionMethodTranslateEnum.ABTesting,
    [TrafficDistributionMethodEnum.Rotation]: TrafficDistributionMethodTranslateEnum.Rotation,
    [TrafficDistributionMethodEnum.TargetingBased]: TrafficDistributionMethodTranslateEnum.TargetingBased
});
