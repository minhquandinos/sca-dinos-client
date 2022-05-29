import { DashboardWidgetModel, WidgetTransformInterface } from '@scaleo/dashboard/common';
import { MetricEnum } from '@scaleo/reports/common';

export class LimitedAffiliateManagerPerformanceWidgetTransform implements WidgetTransformInterface {
    constructor(private config: DashboardWidgetModel, private showNetworkRevenue: boolean) {}

    transform(): DashboardWidgetModel {
        const {
            settings: { list }
        } = this.config;

        let newList = list;
        if (!this.showNetworkRevenue) {
            newList = newList.filter((metric) => ![MetricEnum.EPC, MetricEnum.EPA, MetricEnum.EPM].includes(metric.key as MetricEnum));
        }

        return {
            ...this.config,
            settings: {
                ...this.config.settings,
                list: newList
            }
        };
    }
}
