import { DashboardWidgetModel, WidgetTransformInterface } from '@scaleo/dashboard/common';
import { MetricEnum } from '@scaleo/reports/common';

export class AffiliateNetworkSummaryWidgetTransform implements WidgetTransformInterface {
    constructor(private config: DashboardWidgetModel, private affHidePendingRejectedTransactions: boolean) {}

    transform(): DashboardWidgetModel {
        const {
            settings: { list }
        } = this.config;

        const newList = list.map((elem) => {
            if (this.affHidePendingRejectedTransactions) {
                if (elem.key === MetricEnum.TotalConversions) {
                    return {
                        ...elem,
                        key: MetricEnum.ApprovedConversions
                    };
                }

                if (elem.key === MetricEnum.TR) {
                    return {
                        ...elem,
                        key: MetricEnum.CR
                    };
                }

                if (elem.key === MetricEnum.TotalPayout) {
                    return {
                        ...elem,
                        key: MetricEnum.ApprovedPayout
                    };
                }
            }

            return elem;
        });

        return {
            ...this.config,
            settings: {
                ...this.config.settings,
                list: newList
            }
        };
    }
}
