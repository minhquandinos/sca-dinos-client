import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import {
    DashboardWidgetModel,
    getBreakdownByRange,
    replaceDateInDashboardChartFilter,
    WidgetServiceInterface
} from '@scaleo/dashboard/common';
import { DashboardToolbarService } from '@scaleo/dashboard/service';
import { ChartModel } from '@scaleo/platform/chart/common';

import { PerformanceWidgetApi } from '../api/performance-widget.api';
import { PerformanceWidgetState } from '../state/performance-widget.state';

@Injectable()
export class PerformanceWidgetFacade implements WidgetServiceInterface<ChartModel[]> {
    widgetSubject$: Subject<any> = new Subject<any>();

    get widgetData$(): Observable<ChartModel[]> {
        return this.loadPerformanceWidget();
    }

    constructor(
        private performanceWidgetApi: PerformanceWidgetApi,
        private performanceWidgetState: PerformanceWidgetState,
        private dashboardToolbarService: DashboardToolbarService
    ) {}

    loadPerformanceWidget(): Observable<ChartModel[]> {
        return this.widgetSubject$.pipe(
            startWith(''),
            switchMap(() => combineLatest([this.dashboardToolbarService.dateRange$, this.performanceWidgetState.widgetFilters$])),
            map(([date, filter]) => {
                const breakdown = getBreakdownByRange(date);

                return {
                    ...filter,
                    params: {
                        ...filter.params
                    },
                    payload: {
                        ...filter.payload,
                        rangeFrom: date.rangeFrom,
                        rangeTo: replaceDateInDashboardChartFilter(date),
                        preset: date.selectedRange,
                        breakdown,
                        breakdowns: breakdown
                    }
                };
            }),
            switchMap((filters) => this.performanceWidgetApi.index(filters)),
            tap((data) => {
                this.performanceWidgetState.setData(data, this.dashboardToolbarService.selectedRange);
            })
        );
    }

    initSettings(widget: DashboardWidgetModel) {
        this.performanceWidgetState.setSettings(widget);

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { selected_first_metric, selected_second_metric } = widget.settings;
        this.performanceWidgetState.setMetric(selected_first_metric, selected_second_metric);
    }

    setCumulative(selected: boolean) {
        this.performanceWidgetState.updateCumulative(selected);
    }
}
