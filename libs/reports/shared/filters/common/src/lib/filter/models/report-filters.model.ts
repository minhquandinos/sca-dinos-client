import { ShortResponseInterface } from '@scaleo/core/data';
import { GeoIpModel } from '@scaleo/shared/data-access';
import { ShortAdvertiserModel, ShortAffiliateModel, ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';

import { ExtendedValuesType } from '../../../../../component/src/lib/components/report-filters-selected/report-filters-selected-composite-filter/models/report-filters-selected-composite-filter.model';
import { ReportFiltersSelectedDefaultSelectValueType } from '../../../../../component/src/lib/components/report-filters-selected/report-filters-selected-default-select/models/report-filters-selected-default-select.type';

export interface ReportFiltersInterface {
    group: string;
    key: string;
    items: ReportFilterModel[];
}

export interface ReportFilterResponseInterface {
    group: string;
    groupSort: number;
    key: string;
    label: string;
    sort: number;
    filter: ReportFilterFilterEnum;
}

export interface ReportFilterModel {
    filter: ReportFilterUnionType;
    value?: string[] | number[] | string;
    selected: boolean;
    isSaved?: boolean;
}

export type ReportFiltersDtoModel = {
    [key in ReportFilterUnionType]: string;
};

export type ReportFilterValueType = ReportFilterValueTypeForArray | string;

export type ReportFilterOutputType = {
    [key in ReportFilterUnionType]?: ReportFilterValueType[];
};

export interface ReportFilterOutputModel {
    key: ReportFilterUnionType;
    value: ReportFilterValueType[];
}

export type ReportFilterValueTypeForArray =
    | ShortManagerModel
    | ShortResponseInterface
    | ShortAffiliateModel
    | ShortAdvertiserModel
    | GeoIpModel
    | ExtendedValuesType
    | ReportFiltersSelectedDefaultSelectValueType;

export interface ReportFilterValueTextAreaInterface {
    id: string;
    title: string;
}

/*
 * @Deprecated
 * please use REPORT_FILTER
 * */
export enum ReportFilterFilterEnum {
    TransactionId = 'transactions',
    ClickId = 'clickIds',
    ConversionStatus = 'statuses',
    Currency = 'currencies',
    Reason = 'reasons',
    Redirection = 'redirections',
    Result = 'result',
    Affiliate = 'affiliates',
    AffiliateManager = 'affiliates_managers',
    AffiliateClickId = 'aff_click_ids',
    AffiliateSource = 'affiliates_sources',
    AffiliateSubId1 = 'affiliates_subids1',
    AffiliateSubId2 = 'affiliates_subids2',
    AffiliateSubId3 = 'affiliates_subids3',
    AffiliateSubId4 = 'affiliates_subids4',
    AffiliateSubId5 = 'affiliates_subids5',
    AffiliateParam1 = 'affiliates_params1',
    AffiliateParam2 = 'affiliates_params2',
    AffiliateParam3 = 'affiliates_params3',
    AffiliateParam4 = 'affiliates_params4',
    AffiliateParam5 = 'affiliates_params5',
    ClickRefererUrl = 'clicks_referrers',
    DeepLinkUrl = 'deep_links',
    Advertiser = 'advertisers',
    AdvertiserMananger = 'advertisers_managers',
    Offer = 'offers',
    Goal = 'offers_goals',
    GoalType = 'goals_types',
    Creative = 'offers_creatives',
    LandingPage = 'offers_links',
    AdvertiserTrackId = 'track_ids',
    AdvertiserOrderId = 'orders_ids',
    AdvertiserUserId = 'users_ids',
    AdvertiserParam1 = 'advertisers_params1',
    AdvertiserParam2 = 'advertisers_params2',
    AdvertiserParam3 = 'advertisers_params3',
    AdvertiserParam4 = 'advertisers_params4',
    AdvertiserParam5 = 'advertisers_params5',
    ConversionRefererUrl = 'conversions_referrers',
    Country = 'countries',
    Geo = 'geo',
    DeviceType = 'devices_types',
    DeviceBrand = 'devices_brands',
    DeviceModel = 'devices_models',
    DeviceOS = 'devices_os',
    DeviceOSVersion = 'devices_os_version',
    Browser = 'browsers',
    BrowserVersion = 'browser_version',
    Language = 'languages',
    ConnectionType = 'connections_types',
    MobileOperator = 'mobile_operators',
    IP = 'ips',
    IDFA = 'idfa',
    GAID = 'gaid',
    SmartLinks = 'smartlinks',
    PaidToAffiliate = 'paid_to_affiliate',
    AffiliateInvoice = 'affiliate_invoice',
    Hour = 'hour'
}

export const REPORT_FILTER = {
    transactionId: 'transactions',
    clickId: 'clickIds',
    conversionStatus: 'statuses',
    currency: 'currencies',
    reason: 'reasons',
    redirection: 'redirections',
    result: 'result',
    affiliate: 'affiliates',
    affiliateManager: 'affiliates_managers',
    affiliateClickId: 'aff_click_ids',
    affiliateSource: 'affiliates_sources',
    affiliateSubId1: 'affiliates_subids1',
    affiliateSubId2: 'affiliates_subids2',
    affiliateSubId3: 'affiliates_subids3',
    affiliateSubId4: 'affiliates_subids4',
    affiliateSubId5: 'affiliates_subids5',
    affiliateParam1: 'affiliates_params1',
    affiliateParam2: 'affiliates_params2',
    affiliateParam3: 'affiliates_params3',
    affiliateParam4: 'affiliates_params4',
    affiliateParam5: 'affiliates_params5',
    clickRefererUrl: 'clicks_referrers',
    deepLinkUrl: 'deep_links',
    advertiser: 'advertisers',
    advertiserMananger: 'advertisers_managers',
    offer: 'offers',
    goal: 'offers_goals',
    goalType: 'goals_types',
    creative: 'offers_creatives',
    landingPage: 'offers_links',
    advertiserTrackId: 'track_ids',
    advertiserOrderId: 'orders_ids',
    advertiserUserId: 'users_ids',
    advertiserParam1: 'advertisers_params1',
    advertiserParam2: 'advertisers_params2',
    advertiserParam3: 'advertisers_params3',
    advertiserParam4: 'advertisers_params4',
    advertiserParam5: 'advertisers_params5',
    conversionRefererUrl: 'conversions_referrers',
    country: 'countries',
    geo: 'geo',
    deviceType: 'devices_types',
    deviceBrand: 'devices_brands',
    deviceModel: 'devices_models',
    deviceOS: 'devices_os',
    deviceOSVersion: 'devices_os_version',
    browser: 'browsers',
    browserVersion: 'browser_version',
    language: 'languages',
    connectionType: 'connections_types',
    mobileOperator: 'mobile_operators',
    ip: 'ips',
    idfa: 'idfa',
    gaid: 'gaid',
    smartLinks: 'smartlinks',
    paidToAffiliate: 'paid_to_affiliate',
    affiliateInvoice: 'affiliate_invoice',
    hour: 'hour'
} as const;

export type ReportFilterType = typeof REPORT_FILTER;

export type ReportFilterUnionType = ReportFilterType[keyof typeof REPORT_FILTER];

export interface RemoveFilterValueModel {
    key: ReportFilterFilterEnum;
    newValue: string[] | number[];
}
