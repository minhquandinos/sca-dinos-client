import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SelectedMetricModel } from '@scaleo/chart/common';
import {
    DashboardWidgetModel,
    DashboardWidgetSettingsModel,
    transformDashboardChartResponse,
    WidgetFiltersInterface,
    WidgetSettingsInterface
} from '@scaleo/dashboard/common';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { MetricEnum } from '@scaleo/reports/common';
import { Filter2Interface } from '@scaleo/shared/services/filters';
import { Util } from '@scaleo/utils';

@Injectable()
export class PerformanceWidgetState implements WidgetFiltersInterface, WidgetSettingsInterface {
    private cumulative$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    readonly _cumulative$: Observable<boolean> = this.cumulative$.asObservable();

    private data$: BehaviorSubject<ChartModel[]> = new BehaviorSubject<ChartModel[]>([]);

    readonly _data$: Observable<ChartModel[]> = this.getData();

    private selectedMetric$: BehaviorSubject<SelectedMetricModel> = new BehaviorSubject<SelectedMetricModel>({
        first: null,
        second: null
    });

    readonly _selectedMetric$: Observable<SelectedMetricModel> = this.selectedMetric$.asObservable();

    widgetFilters$: BehaviorSubject<Filter2Interface> = new BehaviorSubject<Filter2Interface>({
        params: {
            sortField: 'added_date',
            sortDirection: 'desc',
            perPage: 10,
            page: 1
        },
        payload: {
            breakdown: 'day',
            breakdowns: 'day'
        }
    });

    widgetSettings$: BehaviorSubject<DashboardWidgetSettingsModel> = new BehaviorSubject<DashboardWidgetSettingsModel>(null);

    setData(data: ChartModel[], selectedRange?: CustomDateRangeTitleEnum): void {
        this.data$.next(transformDashboardChartResponse(selectedRange, data));
    }

    setMetric(first: MetricEnum, second: MetricEnum): void {
        this.selectedMetric$.next({
            first,
            second
        });

        const columns = [first, second].filter((metric) => !!metric).join(',');
        this.widgetFilters$.next({
            ...this.widgetFilters$.value,
            payload: {
                ...this.widgetFilters$.value.payload,
                columns
            }
        });
    }

    setSettings(widget: DashboardWidgetModel): void {
        this.widgetSettings$.next(widget.settings);
    }

    get firstMetric(): MetricEnum {
        return this.selectedMetric$.value.first;
    }

    get secondMetric(): MetricEnum {
        return this.selectedMetric$.value.second;
    }

    updateCumulative(selected: boolean): void {
        this.cumulative$.next(selected);
    }

    private getData(): Observable<ChartModel[]> {
        return combineLatest([this.data$, this._cumulative$]).pipe(
            map(([data, cumulative]) => {
                if (cumulative) {
                    if (Util.isNotEmpty(data)) {
                        return this.calculateCumulative(data);
                    }
                }
                return data || [];
            })
        );
    }

    private calculateCumulative(data: ChartModel[]): ChartModel[] {
        return data.map((elem) => {
            const {
                current,
                current: { series: currentSeries },
                previous,
                previous: { series: previousSeries }
            } = elem;

            return {
                ...elem,
                current: {
                    ...current,
                    series: currentSeries?.map((serie, index) => currentSeries.slice(0, index + 1).reduce((a, b) => a + b))
                },
                previous: {
                    ...previous,
                    series: previousSeries?.map((serie, index) => previousSeries.slice(0, index + 1).reduce((a, b) => a + b))
                }
            };
        });
    }
}
