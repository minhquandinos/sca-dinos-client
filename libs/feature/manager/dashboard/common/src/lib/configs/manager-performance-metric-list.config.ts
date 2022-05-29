import { DashboardWidgetSettingsItemModel } from '@scaleo/dashboard/common';
import { MetricEnum } from '@scaleo/reports/common';
import { getConfig } from '@scaleo/utils';

const config = [
    {
        key: MetricEnum.Impressions
    },
    {
        key: MetricEnum.CTR
    },
    {
        key: MetricEnum.GrossClicks
    },
    {
        key: MetricEnum.UniqueClicks
    },
    {
        key: MetricEnum.DuplicateClicks
    },
    {
        key: MetricEnum.InvalidClicks
    },
    {
        key: MetricEnum.ClicksRevenue
    },
    {
        key: MetricEnum.ClicksPayout
    },
    {
        key: MetricEnum.ClicksProfit
    },
    {
        key: MetricEnum.ApprovedConversions
    },
    {
        key: MetricEnum.CR
    },
    {
        key: MetricEnum.ApprovedRevenue
    },
    {
        key: MetricEnum.ApprovedPayout
    },
    {
        key: MetricEnum.ApprovedProfit
    },
    {
        key: MetricEnum.ApprovedSales
    },
    {
        key: MetricEnum.TotalConversions
    },
    {
        key: MetricEnum.TR
    },
    {
        key: MetricEnum.TotalRevenue
    },
    {
        key: MetricEnum.TotalPayout
    },
    {
        key: MetricEnum.TotalProfit
    },
    {
        key: MetricEnum.TotalGrossSales
    },
    {
        key: MetricEnum.PendingConversions
    },
    {
        key: MetricEnum.PR
    },
    {
        key: MetricEnum.PendingRevenue
    },
    {
        key: MetricEnum.PendingPayout
    },
    {
        key: MetricEnum.PendingProfit
    },
    {
        key: MetricEnum.PendingGrossSales
    },
    {
        key: MetricEnum.RejectedConversions
    },
    {
        key: MetricEnum.RR
    },
    {
        key: MetricEnum.RejectedRevenue
    },
    {
        key: MetricEnum.RejectedPayout
    },
    {
        key: MetricEnum.RejectedProfit
    },
    {
        key: MetricEnum.RejectedGrossSales
    },
    {
        key: MetricEnum.RPC
    },
    {
        key: MetricEnum.CPC
    },
    {
        key: MetricEnum.EPC
    },
    {
        key: MetricEnum.RPA
    },
    {
        key: MetricEnum.CPA
    },
    {
        key: MetricEnum.EPA
    },
    {
        key: MetricEnum.RPM
    },
    {
        key: MetricEnum.CPM
    },
    {
        key: MetricEnum.EPM
    }
];

export const managerPerformanceWidgetList = getConfig<DashboardWidgetSettingsItemModel[]>(config);
