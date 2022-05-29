import { DASHBOARD_WIDGET, DashboardWidgetModel, getWidgetById, WidgetTransformInterface } from '@scaleo/dashboard/common';

import { LimitedAffiliateNetworkSummaryWidgetTransform } from '../../../../../../../dashboard/shared/widgets/network-summary/component/src/lib/transforms/limited-affiliate-network-summary-widget.transform';
import { LimitedAffiliateManagerPerformanceWidgetTransform } from '../../../../../../../dashboard/shared/widgets/performance/data-access/src/lib/transforms/limited-affiliate-manager-performance-widget.transform';

export class LimitedAffiliateWidgetTransform implements WidgetTransformInterface {
    constructor(protected config: DashboardWidgetModel[], protected showNetworkRevenue: boolean) {}

    transform(): DashboardWidgetModel[] {
        return this.config.map((widget) => {
            if (widget.identifier === DASHBOARD_WIDGET.networkSummary) {
                return this.networkSummary;
            }

            if (widget.identifier === DASHBOARD_WIDGET.performance) {
                return this.performance;
            }

            return widget;
        });
    }

    private get networkSummary(): DashboardWidgetModel {
        const widget = getWidgetById(this.config, DASHBOARD_WIDGET.networkSummary);
        const widgetTransform = new LimitedAffiliateNetworkSummaryWidgetTransform(widget, this.showNetworkRevenue);

        return widgetTransform.transform();
    }

    private get performance(): DashboardWidgetModel {
        const widget = getWidgetById(this.config, DASHBOARD_WIDGET.performance);
        const widgetTransform = new LimitedAffiliateManagerPerformanceWidgetTransform(widget, this.showNetworkRevenue);

        return widgetTransform.transform();
    }
}
