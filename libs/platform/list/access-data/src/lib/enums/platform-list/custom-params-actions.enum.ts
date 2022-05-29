export enum CustomParamsActionIdEnum {
    Revenue = 1,
    Payout = 2,
    DailyCap = 3,
    WeeklyCap = 4,
    MonthlyCap = 5,
    TotalCap = 6,
    ThrottleRatePending = 7,
    ThrottleRateRejected = 8,
    TrafficBackURL = 9,
    ForceRedirect = 10,
    TrafficBackOffer = 11
}

export enum CustomParamsActionTitleEnum {
    Revenue = 'offers_page.custom_parameters.actions.revenue',
    Payout = 'offers_page.custom_parameters.actions.payout',
    DailyCap = 'offers_page.custom_parameters.actions.daily_cap',
    WeeklyCap = 'offers_page.custom_parameters.actions.weekly_cap',
    MonthlyCap = 'offers_page.custom_parameters.actions.monthly_cap',
    TotalCap = 'offers_page.custom_parameters.actions.total_cap',
    ThrottleRatePending = 'offers_page.custom_parameters.actions.throttle_rate_to_pending',
    ThrottleRateRejected = 'offers_page.custom_parameters.actions.throttle_rate_to_rejected',
    TrafficBackURL = 'offers_page.custom_parameters.actions.trafficback_url',
    ForceRedirect = 'offers_page.custom_parameters.actions.force_redirect',
    TrafficBackOffer = 'offers_page.custom_parameters.actions.trafficback_offer'
}
