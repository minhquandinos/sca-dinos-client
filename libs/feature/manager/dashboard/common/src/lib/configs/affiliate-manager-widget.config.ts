import { DASHBOARD_WIDGET, DashboardWidgetModel, GridConfigColEnum, GridConfigRowEnum } from '@scaleo/dashboard/common';
import { MetricEnum } from '@scaleo/reports/common';
import { getConfig } from '@scaleo/utils';

import { managerPerformanceWidgetList } from './manager-performance-metric-list.config';

const config = [
    {
        id: DASHBOARD_WIDGET.networkSummary,
        identifier: DASHBOARD_WIDGET.networkSummary,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.Full,
            rows: GridConfigRowEnum.One,
            minItemCols: GridConfigColEnum.Full,
            minItemRows: GridConfigRowEnum.One,
            maxItemRows: GridConfigRowEnum.Two,
            y: 0,
            x: 0,
            resizeEnabled: false
        },
        settings: {
            list: [
                {
                    key: MetricEnum.GrossClicks,
                    selected: true
                },
                {
                    key: MetricEnum.TotalConversions,
                    selected: true
                },
                {
                    key: MetricEnum.CR,
                    selected: true
                },
                {
                    key: 'live_stream',
                    selected: true
                },
                {
                    key: MetricEnum.TotalRevenue,
                    selected: true
                },
                {
                    key: MetricEnum.TotalPayout,
                    selected: true
                },
                {
                    key: MetricEnum.TotalProfit,
                    selected: true
                },
                {
                    key: MetricEnum.EPC,
                    selected: true
                }
            ]
        }
    },
    {
        id: DASHBOARD_WIDGET.performance,
        identifier: DASHBOARD_WIDGET.performance,
        translateKey: 'title',
        active: true,
        multi: true,
        gridConfig: {
            cols: GridConfigColEnum.Half,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            maxItemRows: GridConfigRowEnum.Two,
            y: 2,
            x: 0
        },
        settings: {
            list: managerPerformanceWidgetList,
            selected_first_metric: MetricEnum.TotalConversions,
            selected_second_metric: ''
        }
    },
    {
        id: DASHBOARD_WIDGET.pendingRecords,
        identifier: DASHBOARD_WIDGET.pendingRecords,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.Half,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            maxItemRows: GridConfigRowEnum.Two,
            y: 2,
            x: 6
        },
        settings: {
            list: [
                {
                    key: 'affiliates',
                    selected: true
                },
                {
                    key: 'advertisers',
                    selected: false
                },
                {
                    key: 'offer_requests',
                    selected: false
                },
                {
                    key: 'affiliate-postbacks',
                    selected: false
                }
            ]
        }
    },
    {
        id: DASHBOARD_WIDGET.topOffer,
        identifier: DASHBOARD_WIDGET.topOffer,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.Half,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            y: 4,
            x: 0
        },
        settings: {}
    },
    {
        id: DASHBOARD_WIDGET.topAffiliate,
        identifier: DASHBOARD_WIDGET.topAffiliate,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.Half,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            y: 4,
            x: 6
        },
        settings: {}
    }
];

export const affiliateManagerWidgetsConfig = getConfig<DashboardWidgetModel[]>(config);
