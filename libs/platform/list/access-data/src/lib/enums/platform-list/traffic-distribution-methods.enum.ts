export enum TrafficDistributionMethodEnum {
    None = 1,
    ABTesting,
    Rotation,
    TargetingBased
}

export enum TrafficDistributionMethodTranslateEnum {
    None = 'interface.basic.none',
    ABTesting = 'platform_list.traffic_distribution_methods.ab_testing',
    Rotation = 'platform_list.traffic_distribution_methods.rotation',
    TargetingBased = 'platform_list.traffic_distribution_methods.targeting_based'
}
