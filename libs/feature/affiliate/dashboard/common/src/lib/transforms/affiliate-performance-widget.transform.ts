import { DashboardWidgetModel, WidgetTransformInterface } from '@scaleo/dashboard/common';
import { MetricEnum } from '@scaleo/reports/common';

export class AffiliatePerformanceWidgetTransform implements WidgetTransformInterface {
    private excludeMetric = [
        MetricEnum.TR,
        MetricEnum.TotalConversions,
        MetricEnum.RR,
        MetricEnum.RejectedConversions,
        MetricEnum.RejectedRevenue,
        MetricEnum.RejectedPayout,
        MetricEnum.RejectedProfit,
        MetricEnum.RejectedSales,
        MetricEnum.RejectedGrossSales,
        MetricEnum.PendingConversions,
        MetricEnum.PR,
        MetricEnum.PendingRevenue,
        MetricEnum.PendingPayout,
        MetricEnum.PendingProfit,
        MetricEnum.PendingGrossSales,
        MetricEnum.PendingMargin,
        MetricEnum.TotalPayout
    ];

    constructor(private config: DashboardWidgetModel, private affHidePendingRejectedTransactions: boolean) {}

    transform(): DashboardWidgetModel {
        const {
            settings: { list }
        } = this.config;

        const selectedFirstMetric = this.affHidePendingRejectedTransactions ? MetricEnum.ApprovedConversions : MetricEnum.TotalConversions;

        const newList = list.filter((metric) => !this.excludeMetric.includes(metric.key as any));

        return {
            ...this.config,
            settings: {
                ...this.config.settings,
                selected_first_metric: selectedFirstMetric,
                list: newList
            }
        };
    }
}
