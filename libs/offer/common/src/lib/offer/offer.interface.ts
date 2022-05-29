import { PostbackInterface } from '@scaleo/affiliate/postback/list/data-access';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { ShortAdvertiserModel } from '@scaleo/shared/data-access/short-entity-list';

import { GoalOfferModel } from '../goal/goal.interface';
import { OfferVisibilityModel } from '../offer-visibility/offer-visibility.model';
import { OfferCustomParametersInterface } from './offer-custom-parameters.interface';

export interface OfferInterface {
    id: number;
    title: string;
    status: number;
    status_name?: string;
    description: string;
    internal_info: string;
    advertiser_id: number;
    advertiser: ShortAdvertiserModel;
    currency: CurrencyEnum;
    currency_name?: string;
    image: string;
    image_preview: string;
    tags: string;
    tags_selected?: any;
    deep_linking: number;
    hide_referer_url: number;
    double_meta_redirect: number;
    unique_ips: number;
    unique_ips_time_span: number;
    cookie_lifetime: number;
    postback_lifetime: number;
    postback_password: string;
    postback_whitelist_ips: string;
    postback_blacklist_ips: string;
    is_featured: number;
    is_expires: number;
    expiration_date: string;
    tracking_domain_id: number;
    tracking_domain?: TrackingDomainsInterface;
    fail_traffic_forwarding: number;
    fail_traffic_forwarding_name: string;
    created: number;
    updated: number;
    timezone: string;
    timezone_name?: string;
    image_data?: string;
    goals: GoalOfferModel[];
    targeting?: TargetingInterface;
    extended_targeting?: ExtendedTargetingInterface[];
    cr?: string;
    adv_cr?: number;
    cpc?: number;
    epc?: string;
    aff_epc?: string;
    affiliates_count?: number;
    creatives: OfferCreativeInterface[];
    creatives_count?: number;
    links_count?: number;
    links: OfferUrlsInterface[];
    visible_type?: OffersVisibilityIdEnum;
    visible_type_selected?: OfferVisibilityModel[];
    currencySign?: string;
    postbacks?: PostbackInterface[];
    'custom-params': any;
    custom_params?: OfferCustomParametersInterface[];
    traffic_types: string;
    traffic_types_selected: any;
}

export interface OfferTrackingInterface {
    tracking_domain_id: number;
    fail_traffic_forwarding: number;
    deep_linking: number;
    hide_referer_url: number;
    double_meta_redirect: number;
    unique_ips: number;
    unique_ips_time_span: number;
    cookie_lifetime: number;
    postback_lifetime: number;
    postback_password: string;
    postback_whitelist_ips: string;
    postback_blacklist_ips: string;
    tracking_domains: TrackingDomainsInterface[];
    fail_traffic_forwarding_types: FailTrafficForwardingTypesInterface[];
    offers_to_forward?: number;
    show_sales_amount: number;
}

export interface TrackingDomainsInterface {
    id: number;
    name: string;
    sort?: number;
}

export interface FailTrafficForwardingTypesInterface {
    id: number;
    name: string;
}

/*
 * @deprecated
 * use GoalTypeEnum from  src/@scaleo/enums/platform-list/goal-types.enum.ts
 * */
export enum GoalTypesEnum {
    CPC = 1,
    CPA = 2,
    CPL = 3,
    CPS = 4,
    CPI = 5
}

export enum GoalCapTypeEnum {
    Approved = 1,
    ApprovedPending = 2,
    Budget = 3
}

export enum TrackingMethodsEnum {
    Postback = 1,
    IframePixel = 2,
    JavaScriptPixel = 3,
    ImgPixel = 4
}

export interface GoalConverterInput {
    trackingType: TrackingMethodsEnum;
    typeGoal: GoalTypesEnum;
    trackingLink: string;
    alias?: string;
    goalId: number;
    goalIsDefault?: boolean;
    postbackToken?: string | null;
}

export interface OfferGoalInterface {
    id: number;
    title: string;
    description: string;
    type: number;
    type_title?: string;
    revenue: string;
    payout: string;
    tracking_method: number;
    tracking_method_title?: string;
    conversion_status: number;
    conversion_status_title?: string;
    unique_track_id: number;
    fire_affiliate_postback: number;
    is_private: number;
    multiple_conversions: number;
    offer_id: number;
    status: number;
    payout_tiers: boolean;
    tier_silver: number;
    tier_gold: number;
    tier_platinum: number;
    caps: any;
    is_default: boolean;
    tracking_code?: string;
    alias?: string;
}

export interface OfferUrlsInterface {
    status: number;
    id: number;
    title: string;
    type: number;
    url: string;
    type_title?: string;
    preview: string;
}

/*
 * @deprecated use
 * */
export enum OfferUrlsTypesEnum {
    Default = 1,
    Preview = 2,
    Public = 3,
    Private = 4
}

export interface OfferCreativeInterface {
    id: number;
    title: string;
    description: string;
    type: number;
    offer_url_id: number;
    count_impressions: number;
    html_code: string;
    plain_text: string;
    status: number;
    offer_id: number;
    type_selected?: string;
    offer_url_selected?: string;
    image?: any;
    image_data?: any;
    source_file?: File;
    banner?: any;
    tracking_url?: string;
    image_height?: number;
    image_size?: number;
    image_width?: number;
    xml_feed_url?: string;
}

export interface OfferAffiliateRequestInterface {
    date: string;
    status: number;
    status_title: string;
    id: number;
    name: string;
}

// export enum VisibilityAffiliateEnum {
//     Public = 1,
//     Require_Approval = 2,
//     Private = 3
// }

export interface CountsInfoInterface {
    goals: { [key: string]: number };
    offer_urls: { [key: string]: number };
    creatives: { [key: string]: number };
    custom_params: { [key: string]: number };
    activity_logs?: { [key: string]: number };
}

export interface CustomParameters {
    affiliates: string;
    device_type: string;
    connection_type?: string;
    geolocation?: string;
    payout: string;
    revenue?: string;
    start_date: string;
    end_date: string;
}

export interface GeoTargetingOfferProfile {
    allowed: string;
    denied: string;
}

// export interface OfferRequestsInterface {
//     id: number;
//     offer_id: number;
//     affiliate_id: number;
//     offer_name: string;
//     status: OfferRequestStatusEnum;
//     additional_info: string;
//     created: number;
//     updated: number;
// }

/*
 * @deprecated use OfferTargetingModel
 * */
export interface TargetingInterface {
    geo?: GeoTargetingOfferProfile;
    connectionType?: GeoTargetingOfferProfile;
    mobileOperator?: GeoTargetingOfferProfile;
    deviceType?: GeoTargetingOfferProfile;
    deviceOs?: GeoTargetingOfferProfile;
    deviceOsVersion?: GeoTargetingOfferProfile;
    deviceBrand?: GeoTargetingOfferProfile;
    deviceModel?: GeoTargetingOfferProfile;
    browser?: GeoTargetingOfferProfile;
    language?: GeoTargetingOfferProfile;
}

export interface ExtendedTargetingInterface {
    type: number;
    permission: number;
    conditions?: ExtendedTargetingConditionsInterface[];
    translate?: string;
    search_rule?: string;
}

export interface ExtendedTargetingConditionsInterface {
    id: number;
    title: string;
    country?: string;
    title_ru?: string;
    title_en?: string;
}

export enum YesEnum {
    Yes = 'yes'
}
