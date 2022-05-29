import { Host, Injectable, SkipSelf } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import {
    BaseWidgetService,
    DashboardWidgetSettingsModel,
    getBreakdownByRange,
    replaceDateInDashboardChartFilter,
    transformDashboardChartResponse,
    WidgetFiltersInterface,
    WidgetServiceInterface,
    WidgetSettingsInterface
} from '@scaleo/dashboard/common';
import { DashboardToolbarService } from '@scaleo/dashboard/service';
import { ChartModel } from '@scaleo/platform/chart/common';
import { CustomDateRangeModel } from '@scaleo/platform/date/model';
import { Filter2Interface } from '@scaleo/shared/services/filters';

import { NetworkSummeryWidgetApi } from '../api/network-summery-widget.api';
import { NetworkSummaryBodyWidgetDto, NetworkSummaryQueryParamsWidgetDto } from '../requests/network-summary-widget.model';

@Injectable()
export class NetworkSummaryWidgetService
    extends BaseWidgetService
    implements WidgetServiceInterface<ChartModel[]>, WidgetFiltersInterface, WidgetSettingsInterface
{
    widgetSubject$: Subject<any> = new Subject<any>();

    widgetFilters$: BehaviorSubject<Filter2Interface> = new BehaviorSubject<Filter2Interface>({
        params: {
            sortField: 'added_date',
            sortDirection: 'desc',
            perPage: 100,
            page: 1
        },
        payload: {
            breakdown: 'day',
            breakdowns: 'day'
        }
    });

    widgetSettings$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private api: NetworkSummeryWidgetApi, protected dashboardToolbarService: DashboardToolbarService) {
        super(dashboardToolbarService);
    }

    get widgetData$(): Observable<ChartModel[]> {
        return this.widgetSubject$.pipe(
            startWith(''),
            switchMap(() => combineLatest([this.dashboardToolbarService.dateRange$, this.widgetFilters$])),
            map(([date, filter]) => {
                const breakdown = getBreakdownByRange(date);

                const queryParams: NetworkSummaryQueryParamsWidgetDto = {
                    ...filter.params,
                    rangeFrom: date.rangeFrom,
                    rangeTo: replaceDateInDashboardChartFilter(date),
                    preset: date.selectedRange
                };

                const payload: NetworkSummaryBodyWidgetDto = {
                    ...filter.payload,
                    breakdown,
                    breakdowns: breakdown
                };

                return {
                    queryParams,
                    payload
                };
            }),
            switchMap(({ queryParams, payload }) => this.index(queryParams, payload)),
            map((data: ChartModel[]) => transformDashboardChartResponse(this.dashboardToolbarService.selectedRange, data))
        );
    }

    get toolbarDateRange$(): Observable<CustomDateRangeModel> {
        return this.dashboardToolbarService.dateRange$;
    }

    index(queryParams: NetworkSummaryQueryParamsWidgetDto, bodyParams: NetworkSummaryBodyWidgetDto): Observable<ChartModel[]> {
        return this.api.index(queryParams, bodyParams);
    }

    initSettings(settings: DashboardWidgetSettingsModel): void {
        this.widgetSettings$.next(settings);
        this.setWidgetFilter();
    }

    setWidgetFilter(): void {
        const filters = this.widgetFilters$.value;

        const activeWidget = this.widgetSettings$.value.list
            .filter((widget: any) => widget.selected)
            .map((widget: any) => widget.key)
            .join(',');

        this.widgetFilters$.next({
            ...filters,
            payload: {
                ...filters.payload,
                columns: activeWidget
            }
        });
    }
}
