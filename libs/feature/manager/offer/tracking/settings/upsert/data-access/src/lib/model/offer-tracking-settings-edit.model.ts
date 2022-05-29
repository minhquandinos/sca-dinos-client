import { BooleanEnum } from '@scaleo/core/data';

export interface OfferTrackingSettingsPayloadDto {
    readonly tracking_domain_id: number;
    readonly fail_traffic_forwarding: number;
    readonly deep_linking: BooleanEnum;
    readonly double_meta_redirect: BooleanEnum;
    readonly cookie_lifetime: string;
    readonly hide_referer_url: BooleanEnum;
    readonly unique_ips: BooleanEnum;
    readonly unique_ips_time_span: number;
    readonly postback_whitelist_ips: string;
    readonly postback_blacklist_ips: string;
    readonly impressions_url: string;
    readonly show_sales_amount: BooleanEnum;
    readonly change_conversion_status_via_postback: BooleanEnum;
    readonly offers_to_forward: number;
    readonly require_postback_token: BooleanEnum;
    readonly postback_token: string;
}
