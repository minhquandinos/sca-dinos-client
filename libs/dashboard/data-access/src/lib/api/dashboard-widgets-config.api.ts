import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';
import { DASHBOARD_WIDGET, DashboardWidgetModel, GridConfigColEnum, GridConfigRowEnum } from '@scaleo/dashboard/common';
import { MetricEnum } from '@scaleo/reports/common';

import { managerPerformanceWidgetList } from '../../../../../feature/manager/dashboard/common/src/lib/configs/manager-performance-metric-list.config';

@Injectable()
export class DashboardWidgetsConfigApi {
    constructor(private readonly rest: RestApiService) {}

    config(): Observable<DashboardWidgetModel[]> {
        // return this.rest.mock([
        //     {
        //         id: DASHBOARD_WIDGET.networkSummary,
        //         identifier: DASHBOARD_WIDGET.networkSummary,
        //         active: true,
        //         multi: false,
        //         gridConfig: {
        //             cols: GridConfigColEnum.Full,
        //             rows: GridConfigRowEnum.One,
        //             minItemCols: GridConfigColEnum.Full,
        //             minItemRows: GridConfigRowEnum.One,
        //             maxItemRows: GridConfigRowEnum.Two,
        //             y: 0,
        //             x: 0,
        //             resizeEnabled: false
        //         },
        //         settings: {
        //             list: [
        //                 {
        //                     key: MetricEnum.GrossClicks,
        //                     selected: true
        //                 },
        //                 {
        //                     key: MetricEnum.TotalConversions,
        //                     selected: true
        //                 },
        //                 {
        //                     key: MetricEnum.CR,
        //                     selected: true
        //                 },
        //                 {
        //                     key: 'live_stream',
        //                     selected: true
        //                 },
        //                 {
        //                     key: MetricEnum.TotalRevenue,
        //                     selected: true
        //                 },
        //                 {
        //                     key: MetricEnum.TotalPayout,
        //                     selected: true
        //                 },
        //                 {
        //                     key: MetricEnum.TotalProfit,
        //                     selected: true
        //                 },
        //                 {
        //                     key: MetricEnum.EPC,
        //                     selected: true
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         id: DASHBOARD_WIDGET.performance,
        //         identifier: DASHBOARD_WIDGET.performance,
        //         translateKey: 'title',
        //         active: true,
        //         multi: true,
        //         gridConfig: {
        //             cols: GridConfigColEnum.Half,
        //             rows: GridConfigRowEnum.Two,
        //             minItemCols: GridConfigColEnum.Half,
        //             minItemRows: GridConfigRowEnum.Two,
        //             maxItemRows: GridConfigRowEnum.Two,
        //             y: 1,
        //             x: 0
        //         },
        //         settings: {
        //             list: managerPerformanceWidgetList,
        //             selected_first_metric: MetricEnum.TotalConversions,
        //             selected_second_metric: ''
        //         }
        //     },
        //     {
        //         id: DASHBOARD_WIDGET.pendingRecords,
        //         identifier: DASHBOARD_WIDGET.pendingRecords,
        //         active: true,
        //         multi: false,
        //         gridConfig: {
        //             cols: GridConfigColEnum.Half,
        //             rows: GridConfigRowEnum.Two,
        //             minItemCols: GridConfigColEnum.Half,
        //             minItemRows: GridConfigRowEnum.Two,
        //             maxItemRows: GridConfigRowEnum.Two,
        //             y: 1,
        //             x: 6
        //         },
        //         settings: {
        //             list: [
        //                 {
        //                     key: 'affiliates',
        //                     selected: true
        //                 },
        //                 {
        //                     key: 'advertisers',
        //                     selected: false
        //                 },
        //                 {
        //                     key: 'offer_requests',
        //                     selected: false
        //                 },
        //                 {
        //                     key: 'affiliate-postbacks',
        //                     selected: false
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         id: DASHBOARD_WIDGET.topOffer,
        //         identifier: DASHBOARD_WIDGET.topOffer,
        //         active: true,
        //         multi: false,
        //         gridConfig: {
        //             cols: GridConfigColEnum.Half,
        //             rows: GridConfigRowEnum.Two,
        //             minItemCols: GridConfigColEnum.Half,
        //             minItemRows: GridConfigRowEnum.Two,
        //             y: 1,
        //             x: 0
        //         },
        //         settings: {}
        //     },
        //     {
        //         id: DASHBOARD_WIDGET.topAffiliate,
        //         identifier: DASHBOARD_WIDGET.topAffiliate,
        //         active: true,
        //         multi: false,
        //         gridConfig: {
        //             cols: GridConfigColEnum.Half,
        //             rows: GridConfigRowEnum.Two,
        //             minItemCols: GridConfigColEnum.Half,
        //             minItemRows: GridConfigRowEnum.Two,
        //             y: 3,
        //             x: 6
        //         },
        //         settings: {}
        //     }
        // ]);
        return this.rest.get<ApiResponse<DashboardWidgetModel>>('dashboard-config').pipe(
            map((response) => {
                return response?.info?.settings || [];
            })
        );
    }
}
