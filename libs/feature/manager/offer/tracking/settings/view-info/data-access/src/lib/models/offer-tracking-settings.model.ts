import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';
import { FailTrafficForwardingTypesInterface, TrackingDomainsInterface } from '@scaleo/offer/common';

import { InvalidTrafficForwardingEnum } from '../enums/invalid-traffic-forwarding.enum';

export interface OfferTrackingSettingsModel {
    change_conversion_status_via_postback: BooleanEnum;
    cookie_lifetime: string;
    custom_trafficback_url: string;
    deep_linking: BooleanEnum;
    double_meta_redirect: BooleanEnum;
    fail_traffic_forwarding: InvalidTrafficForwardingEnum;
    fail_traffic_forwarding_types: FailTrafficForwardingTypesInterface[];
    hide_referer_url: BooleanEnum;
    impressions_url: string;
    offers_to_forward: number;
    postback_whitelist_ips: string;
    postback_blacklist_ips: string;
    show_sales_amount: BooleanEnum;
    tracking_domain_id: number;
    tracking_domains: TrackingDomainsInterface[];
    unique_ips: BooleanEnum;
    unique_ips_time_span: number;
    offers_to_forward_obj: BaseIdTitleModel;
    require_postback_token: BooleanEnum;
    postback_token: string;
}

export interface OfferTrackingSettingsDto {
    readonly change_conversion_status_via_postback: BooleanEnum;
    readonly cookie_lifetime: string;
    readonly custom_trafficback_url: string;
    readonly deep_linking: BooleanEnum;
    readonly double_meta_redirect: BooleanEnum;
    readonly fail_traffic_forwarding: InvalidTrafficForwardingEnum;
    readonly fail_traffic_forwarding_types: FailTrafficForwardingTypesInterface[];
    readonly hide_referer_url: BooleanEnum;
    readonly impressions_url: string;
    readonly offers_to_forward: number;
    readonly offers_to_forward_obj: BaseIdTitleModel;
    readonly postback_whitelist_ips: string;
    readonly postback_blacklist_ips: string;
    readonly show_sales_amount: BooleanEnum;
    readonly tracking_domain_id: number;
    readonly tracking_domains: TrackingDomainsInterface[];
    readonly unique_ips: BooleanEnum;
    readonly unique_ips_time_span: number;
    require_postback_token: BooleanEnum;
    postback_token: string;
}

export interface OfferTrackingSettingsInputDataModel {
    id: number;
    settings: OfferTrackingSettingsModel;
}

export type InvalidTrafficForwardingViewModel = Pick<
    OfferTrackingSettingsModel,
    'fail_traffic_forwarding' | 'custom_trafficback_url' | 'offers_to_forward_obj'
>;
