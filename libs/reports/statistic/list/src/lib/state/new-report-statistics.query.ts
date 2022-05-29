import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { CustomDateRangeModel, CustomDateRangeTitleEnum } from '@scaleo/platform/date/model';
import { CustomDateRangeService } from '@scaleo/platform/date/service';
import { BaseReportQuery, StatisticModel } from '@scaleo/reports/common';
import { ReportFilter, ReportFilterModel, ReportFiltersSelectedInterface } from '@scaleo/reports/shared/filters/common';
import { ReportsService } from '@scaleo/reports/state';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import {
    Filter2Interface,
    GetFilterInterface,
    Post2FiltersInterface,
    RequestPayloadFilter2Interface
} from '@scaleo/shared/services/filters';
import { UiTable2SortColumnModel, UiTableHeaderInterface } from '@scaleo/ui-kit/elements';
import { objectUtil } from '@scaleo/utils';

import { NewReportStatisticsState, NewReportStatisticsStore } from './new-report-statistics.store';

@Injectable()
export class NewReportStatisticsQuery extends BaseReportQuery<NewReportStatisticsState> implements ReportFiltersSelectedInterface {
    constructor(
        protected store: NewReportStatisticsStore,
        private customDateRangeService: CustomDateRangeService,
        protected reportsService: ReportsService
    ) {
        super(store, reportsService);
    }

    get tableColumnsTree$(): Observable<UiTableHeaderInterface[]> {
        return this.select(({ data: { tableColumnsTree } }) => tableColumnsTree);
    }

    get tableColumnsTree(): UiTableHeaderInterface[] {
        return this.getValue().data.tableColumnsTree;
    }

    get totals$(): Observable<StatisticModel> {
        return this.select(({ data: { totals } }) => totals);
    }

    get pagination(): ApiPaginationModel {
        return this.getValue().data.pagination;
    }

    get countItems$(): Observable<number> {
        return this.select(({ data: { pagination } }) => (pagination ? pagination?.total_count : 0));
    }

    get filterBreakdownsArray$(): Observable<string[]> {
        return this.select(({ data: { filterBreakdowns } }) => filterBreakdowns);
    }

    get filterBreakdowns$(): Observable<string> {
        return this.select(({ data: { filterBreakdowns } }) => filterBreakdowns.join(',')).pipe(startWith(''));
    }

    get filterBreakdown$(): Observable<string> {
        return this.select(({ data: { filterBreakdowns } }) => filterBreakdowns[0]).pipe(startWith(''));
    }

    get currency$(): Observable<CurrencyEnum> {
        return this.select(({ data: { currency } }) => currency);
    }

    get filterBreakdown(): string {
        return this.getValue().data.filterBreakdowns[0];
    }

    get filterBreakdowns(): string[] {
        return this.getValue().data.filterBreakdowns;
    }

    get filterData$(): Observable<RequestPayloadFilter2Interface> {
        return this.filtersSelected$.pipe(
            distinctUntilChanged((x, y) => {
                const flt1 = this.window.nativeWindow.btoa(JSON.stringify(x));
                const flt2 = this.window.nativeWindow.btoa(JSON.stringify(y));
                return flt1 === flt2;
            }),
            map((filters) => ReportFilter.convertFiltersValueToRequest(filters))
        );
    }

    get filterData(): RequestPayloadFilter2Interface {
        return ReportFilter.convertFiltersValueToRequest(this.getValue()?.data?.selectedFilters);
    }

    get filterSort$(): Observable<UiTable2SortColumnModel<string>> {
        return this.select(({ data: { sort } }) => sort).pipe(
            startWith({
                field: undefined,
                direction: 'desc'
            }),
            map((sort) => {
                return sort as UiTable2SortColumnModel;
            })
        );
    }

    get filterColumns$(): Observable<any> {
        return this.select(({ data: { columns } }) => columns).pipe(startWith(''));
    }

    get filterColumns(): string {
        return this.getValue().data.columns;
    }

    get filterPage$(): Observable<number> {
        return this.select(({ data: { page } }) => page);
    }

    prepareFilter$(): Observable<Filter2Interface> {
        return objectUtil.mutationKeyWhenValuesChanges(this.paramsAndPayload$, 'page', 1).pipe(
            switchMap((params) => {
                const { columns, sortField, sortDirection, page, currency, breakdown, breakdowns, filters, rangeFrom, rangeTo } = params;
                return of({
                    params: {
                        sortField: sortField || null,
                        sortDirection: sortDirection || 'desc',
                        page,
                        perPage: 25,
                        fieldsType: 'object',
                        currency
                    },
                    payload: {
                        rangeFrom,
                        rangeTo,
                        // rangeFrom:
                        //     breakdown === BreakdownEnum.Hour
                        //         ? date?.rangeTo
                        //         : date?.rangeFrom || this.customDateRangeService.rangeFrom,
                        // rangeTo: date?.rangeTo || this.customDateRangeService.rangeTo,
                        breakdown,
                        breakdowns,
                        columns,
                        filters //: ReportFilter.convertFiltersValueToRequest(filters as any)
                    }
                });
            })
        );
    }

    private dateRange(
        breakdown: BreakdownEnum,
        date: CustomDateRangeModel
    ): {
        rangeFrom: string;
        rangeTo: string;
    } {
        switch (breakdown) {
            case BreakdownEnum.Hour:
                return {
                    rangeFrom: date?.rangeTo || this.customDateRangeService.rangeTo,
                    rangeTo: date?.rangeTo || this.customDateRangeService.rangeTo
                };
            case BreakdownEnum.Month:
            case BreakdownEnum.Year:
                // eslint-disable-next-line no-case-declarations
                const range = this.customDateRangeService.rangeDate(CustomDateRangeTitleEnum.ThisYear);
                return {
                    rangeFrom: date?.rangeFrom || range.rangeFrom,
                    rangeTo: date?.rangeTo || range.rangeTo
                };
            default:
                return {
                    rangeFrom: date?.rangeFrom || this.customDateRangeService.rangeFrom,
                    rangeTo: date?.rangeTo || this.customDateRangeService.rangeTo
                };
        }
    }

    get filtersSelected$(): Observable<ReportFilterModel[]> {
        return this.select(({ data: { selectedFilters } }) => selectedFilters);
    }

    override get paramsAndPayload$(): Observable<Post2FiltersInterface & GetFilterInterface> {
        return combineLatest([
            this.filterColumns$,
            this.filterSort$,
            this.filterBreakdowns$,
            this.filterBreakdown$,
            this.reportsService.date$,
            this.filterPage$,
            this.filterData$,
            this.currency$
        ]).pipe(
            switchMap(([columns, sort, breakdowns, breakdown, date, page, filters, currency]) => {
                if (!columns && !sort?.field) {
                    return EMPTY;
                }
                return of({
                    sortField: sort?.field || null,
                    sortDirection: sort?.direction ? sort?.direction : 'desc',
                    page,
                    perPage: 25,
                    fieldsType: 'object',
                    currency,
                    ...this.dateRange(breakdown as BreakdownEnum, date),
                    breakdown,
                    breakdowns,
                    columns,
                    filters
                });
            })
        );
    }
}
