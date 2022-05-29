import { ID } from '@datorama/akita';

import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';

export interface StatisticModel {
    id: ID;
    affiliates?: StatisticDefaultRowModel;
    goals?: StatisticRowRelationModel;
    geo?: StatisticRowGeoModel;
    hour: StatisticRowHourModel;
    month: StatisticRowMonthModel;
    country: StatisticRowCountryModel;
    [key: string]: StatisticRowType;
}

export interface StatisticsResponseModel {
    rows: StatisticModel[];
    totals: StatisticModel;
}

export interface StatisticDefaultRowModel {
    id?: number;
    value: string | number;
}

export interface StatisticRowRelationModel extends StatisticDefaultRowModel {
    parent_id: number;
    parent_value: string;
}

export interface StatisticRowCountryModel extends StatisticDefaultRowModel {
    code: string;
}

export interface StatisticRowHourModel {
    date: string;
    hour: string;
}

export interface StatisticRowMonthModel {
    month: number;
    year: number;
}

export interface StatisticRowGeoModel {
    city: string;
    country: string;
    country_code: string;
    region: string;
}

export interface StatisticRowInsightsModel {
    country: StatisticRowGeoModel;
    device: StatisticRowDeviceModel;
    os: StatisticRowOsModel;
}

export interface StatisticRowDeviceModel extends StatisticDefaultRowModel {
    type: string | number;
}

export interface StatisticRowOsModel extends StatisticDefaultRowModel {
    type: string;
    version: string;
}

export type StatisticRowType =
    | string
    | unknown
    | StatisticDefaultRowModel
    | StatisticRowRelationModel
    | StatisticRowCountryModel
    | StatisticRowHourModel
    | StatisticRowMonthModel;

export interface TempFiltersModel {
    [page: string]: ReportFilterModel[];
}

export enum ReportTypeEnum {
    Transactions,
    Aggregations
}

// TODO remove thie enum
export enum ReportPagesEnum {
    Statistics = 'statistics',
    Clicks = 'clicks',
    Conversions = 'conversions',
    InvalidTraffic = 'invalid-traffic',
    InvalidClicks = 'invalid-clicks',
    AdvertiserPostbacks = 'advertiser-postbacks',
    AffiliatesPostbacks = 'affiliates-postbacks',
    Adjustments = 'adjustments',
    Referrals = 'referrals',
    SmartLinks = 'smart-links'
}

export const COLUMNS_HIDE_SORT: string[] = ['insights', 'affiliate_invoice', 'geo', 'transaction_id'];

export const reportColumnHideSort = (column: string): boolean => !COLUMNS_HIDE_SORT.includes(column);
