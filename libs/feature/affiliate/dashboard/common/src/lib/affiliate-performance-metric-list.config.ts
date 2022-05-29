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
        key: MetricEnum.ApprovedPayout
    },
    {
        key: MetricEnum.ClicksPayout
    },
    {
        key: MetricEnum.TotalPayout
    },
    {
        key: MetricEnum.ApprovedConversions
    },
    {
        key: MetricEnum.CR
    },
    {
        key: MetricEnum.TotalConversions
    },
    {
        key: MetricEnum.TR
    },
    {
        key: MetricEnum.PendingConversions
    },
    {
        key: MetricEnum.PR
    },
    {
        key: MetricEnum.PendingPayout
    },
    {
        key: MetricEnum.RejectedConversions
    },
    {
        key: MetricEnum.RR
    },
    {
        key: MetricEnum.RejectedPayout
    },
    {
        key: MetricEnum.EPC
    },
    {
        key: MetricEnum.EPA
    },
    {
        key: MetricEnum.EPM
    }
];

export const affiliatePerformanceWidgetList = getConfig<DashboardWidgetSettingsItemModel[]>(config);
