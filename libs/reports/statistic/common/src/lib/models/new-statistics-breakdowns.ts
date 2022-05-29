import { InjectionToken } from '@angular/core';

import { ReportPagesEnum } from '@scaleo/reports/common';

import { NewReportStatisticsRouteEnum } from '../new-report-statistics-route.enum';
import { BreakdownEnum } from './breakdown.enum';

export const STATISTICS_BREAKDOWNS_TOKEN = new InjectionToken<BreakdownPathModel>('StatisticsBreakdowns');

export const newStatisticsBreakdowns: BreakdownsPathMapModel = {
    [NewReportStatisticsRouteEnum.Custom]: [{ breakdown: BreakdownEnum.Custom }],
    [NewReportStatisticsRouteEnum.Day]: [{ breakdown: BreakdownEnum.Day }, { breakdown: BreakdownEnum.Hour }],
    [NewReportStatisticsRouteEnum.Month]: [{ breakdown: BreakdownEnum.Month }, { breakdown: BreakdownEnum.Day }],
    [NewReportStatisticsRouteEnum.Affiliate]: [{ breakdown: BreakdownEnum.Affiliate }, { breakdown: BreakdownEnum.Offer }],
    [NewReportStatisticsRouteEnum.Advertiser]: [{ breakdown: BreakdownEnum.Advertiser }, { breakdown: BreakdownEnum.Offer }],
    [NewReportStatisticsRouteEnum.Offer]: [{ breakdown: BreakdownEnum.Offer }, { breakdown: BreakdownEnum.Affiliate }],
    [NewReportStatisticsRouteEnum.Goal]: [{ breakdown: BreakdownEnum.Goals }],
    [NewReportStatisticsRouteEnum.Country]: [{ breakdown: BreakdownEnum.Country }],
    [NewReportStatisticsRouteEnum.DeviceType]: [{ breakdown: BreakdownEnum.DeviceType }, { breakdown: BreakdownEnum.DeviceOS }],
    [NewReportStatisticsRouteEnum.ConnectionType]: [{ breakdown: BreakdownEnum.ConnectionType }],
    [NewReportStatisticsRouteEnum.Os]: [{ breakdown: BreakdownEnum.DeviceOS }],
    [ReportPagesEnum.SmartLinks]: [{ breakdown: BreakdownEnum.SmartLink }]
};

export interface BreakdownsPathMapModel {
    [key: string]: BreakdownPathModel[];
}

export interface BreakdownPathModel {
    breakdown: BreakdownEnum;
}
