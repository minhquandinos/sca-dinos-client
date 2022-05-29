import { DASHBOARD_WIDGET, DashboardWidgetModel, GridConfigColEnum, GridConfigRowEnum } from '@scaleo/dashboard/common';

import { managerPerformanceWidgetList } from './manager-performance-metric-list.config';

export const baseWidgetsConfig: DashboardWidgetModel[] = [
    {
        id: DASHBOARD_WIDGET.networkSummary,
        identifier: DASHBOARD_WIDGET.networkSummary,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.Full,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Full,
            minItemRows: GridConfigRowEnum.Two,
            maxItemRows: GridConfigRowEnum.Two,
            y: 0,
            x: 0,
            resizeEnabled: false
        },
        settings: {
            list: [
                {
                    key: 'clicks',
                    selected: true
                },
                {
                    key: 'cv_total',
                    selected: true
                },
                {
                    key: 'tr',
                    selected: true
                },
                {
                    key: 'live_stream',
                    selected: true
                },
                {
                    key: 'total_revenue',
                    selected: true
                },
                {
                    key: 'total_payout',
                    selected: true
                },
                {
                    key: 'total_profit',
                    selected: true
                },
                {
                    key: 'epc',
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
            cols: GridConfigColEnum.TwoThirds,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            maxItemRows: GridConfigRowEnum.Two,
            y: 2,
            x: 0
        },
        settings: {
            list: managerPerformanceWidgetList,
            selected_first_metric: 'cv_total',
            selected_second_metric: ''
        }
    },
    {
        id: DASHBOARD_WIDGET.shortcuts,
        identifier: DASHBOARD_WIDGET.shortcuts,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.OneThird,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.OneThird,
            minItemRows: GridConfigRowEnum.Two,
            y: 2,
            x: 7
        },
        settings: {}
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
            y: 6,
            x: 0
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
        id: DASHBOARD_WIDGET.notifications,
        identifier: DASHBOARD_WIDGET.notifications,
        active: true,
        multi: false,
        gridConfig: {
            cols: GridConfigColEnum.Half,
            rows: GridConfigRowEnum.Two,
            minItemCols: GridConfigColEnum.Half,
            minItemRows: GridConfigRowEnum.Two,
            y: 6,
            x: 6
        },
        settings: {}
    }
];
