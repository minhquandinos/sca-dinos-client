import { GridsterItem } from 'angular-gridster2';

import {
    DashboardWidgetModel,
    DashboardWidgetSettingsItemModel,
    GridConfigRowEnum,
    WidgetTransformInterface
} from '@scaleo/dashboard/common';
import { MetricEnum } from '@scaleo/reports/common';

export class LimitedAffiliateNetworkSummaryWidgetTransform implements WidgetTransformInterface {
    constructor(private config: DashboardWidgetModel, private showNetworkRevenue: boolean) {}

    transform(): DashboardWidgetModel {
        return {
            ...this.config,
            gridConfig: this.gridConfig,
            settings: {
                ...this.config.settings,
                list: this.metricList
            }
        };
    }

    private get gridConfig(): GridsterItem {
        return {
            ...this.config.gridConfig,
            rows: this.showNetworkRevenue ? GridConfigRowEnum.Two : GridConfigRowEnum.One,
            minItemRows: this.showNetworkRevenue ? GridConfigRowEnum.Two : GridConfigRowEnum.One
        };
    }

    private get metricList(): DashboardWidgetSettingsItemModel[] {
        const metricCanBeChanged = ['live_stream', MetricEnum.TotalRevenue, MetricEnum.TotalProfit, MetricEnum.EPC];

        return this.config.settings.list.map((elem) => {
            if (metricCanBeChanged.includes(elem.key)) {
                return {
                    ...elem,
                    selected: this.showNetworkRevenue
                };
            }
            return elem;
        });
    }
}
