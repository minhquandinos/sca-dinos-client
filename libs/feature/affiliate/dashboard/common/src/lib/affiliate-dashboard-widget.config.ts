import { DASHBOARD_WIDGET, DashboardWidgetModel, GridConfigColEnum, GridConfigRowEnum } from '@scaleo/dashboard/common';
import { MetricEnum } from '@scaleo/reports/common';
import { getConfig } from '@scaleo/utils';

import { affiliatePerformanceWidgetList } from './affiliate-performance-metric-list.config';

const config = [
    {
        id: DASHBOARD_WIDGET.networkSummary,
        identifier: DASHBOARD_WIDGET.networkSummary,
        translateKey: 'title_affiliate',
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
                    key: MetricEnum.TR,
                    selected: true
                },

                {
                    key: MetricEnum.TotalPayout,
                    selected: true
                }
            ]
        }
    },
    {
        id: DASHBOARD_WIDGET.offerPromote,
        identifier: DASHBOARD_WIDGET.offerPromote,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.TwoThirds,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            maxItemRows: GridConfigRowEnum.Two,
            y: 1,
            x: 0
        }
    },
    {
        id: DASHBOARD_WIDGET.balance,
        identifier: DASHBOARD_WIDGET.balance,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.OneThird,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.OneThird,
            minItemRows: GridConfigRowEnum.Two,
            maxItemRows: GridConfigRowEnum.Two,
            y: 1,
            x: 8
        }
    },
    {
        id: DASHBOARD_WIDGET.announcements,
        identifier: DASHBOARD_WIDGET.announcements,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.Half,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            y: 3,
            x: 0
        },
        settings: {}
    },
    {
        id: DASHBOARD_WIDGET.pendingRecordsAffiliate,
        identifier: DASHBOARD_WIDGET.pendingRecordsAffiliate,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.Half,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            maxItemRows: GridConfigRowEnum.Two,
            y: 3,
            x: 6
        }
    },
    {
        id: DASHBOARD_WIDGET.performance,
        identifier: DASHBOARD_WIDGET.performance,
        active: true,
        multi: true,
        gridConfig: {
            cols: GridConfigColEnum.Half,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            maxItemRows: GridConfigRowEnum.Two,
            y: 5,
            x: 0
        },
        settings: {
            list: affiliatePerformanceWidgetList,
            selected_first_metric: MetricEnum.TotalConversions,
            selected_second_metric: ''
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
            maxItemRows: GridConfigRowEnum.Two,
            y: 5,
            x: 6
        }
    }
];

export const affiliateDashboardWidgetsConfig = getConfig<DashboardWidgetModel[]>(config);
