import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { StatisticModel } from '@scaleo/reports/common';
import { isTimeBreakdown } from '@scaleo/reports/statistic/common';
import { Filter2Interface } from '@scaleo/shared/services/filters';

import { ReportStatisticsChildrenFilter } from '../../../classes/filters/report-statistics-children-filter';
import { NewReportStatisticsQuery, NewReportStatisticsService } from '../../../state';
import { ReportStatisticsChildrenBreakdownService } from './report-statistics-children-breakdown.service';
import { ReportStatisticsChildrenCurrentFieldService } from './report-statistics-children-current-field.service';
import { ReportStatisticsChildrenDateRangeService } from './report-statistics-children-date-range.service';
import { ReportStatisticsChildrenFiltersService } from './report-statistics-children-filters.service';
import { ReportStatisticsChildrenLoadMoreService } from './report-statistics-children-load-more.service';

@Injectable()
export class ReportStatisticsChildrenDataService {
    private _children$: BehaviorSubject<StatisticModel[]> = new BehaviorSubject<StatisticModel[]>([]);

    children$ = this._children$.asObservable();

    constructor(
        private statisticsService: NewReportStatisticsService,
        private statisticsQuery: NewReportStatisticsQuery,
        private loadMoreService: ReportStatisticsChildrenLoadMoreService,
        private childrenDateRangeService: ReportStatisticsChildrenDateRangeService,
        private childrenBreakdownService: ReportStatisticsChildrenBreakdownService,
        private childrenFiltersService: ReportStatisticsChildrenFiltersService,
        private childrenCurrentFieldService: ReportStatisticsChildrenCurrentFieldService
    ) {}

    private get(filter: Filter2Interface): Observable<StatisticModel[]> {
        return this.statisticsService.get(filter).pipe(
            tap((response) => {
                const { pagination } = response;
                this.loadMoreService.setPagination(pagination);
            }),
            map((response) => {
                const { results } = response;
                return results.rows.map((row: any) => ({
                    ...row,
                    id: guid(),
                    ...this.statisticsService.nullableIsFieldEmptyBreakdown(this.childrenBreakdownService.breakdown)
                }));
            }),
            tap((rows) => {
                this._children$.next([...this._children$.value, ...rows]);
            })
        );
    }

    setChildrenData(page = 1): Observable<StatisticModel[]> {
        return this.statisticsQuery.prepareFilter$().pipe(
            switchMap((filter) => {
                const date = {
                    parent: this.childrenDateRangeService.parentDateRange,
                    children: {
                        rangeFrom: filter.payload.rangeFrom,
                        rangeTo: filter.payload.rangeTo
                    }
                };

                const prepareFilter = new ReportStatisticsChildrenFilter(
                    this.childrenBreakdownService.breakdown,
                    this.childrenBreakdownService.parentBreakdown,
                    this.childrenFiltersService.parentFilters,
                    this.childrenCurrentFieldService.currentField,
                    date
                );

                const newFilter = {
                    ...filter,
                    params: {
                        ...filter.params,
                        page,
                        perPage: 25,
                        sortField: isTimeBreakdown(this.childrenBreakdownService.breakdown)
                            ? this.childrenBreakdownService.breakdown
                            : filter.params.sortField,
                        sortDirection: isTimeBreakdown(this.childrenBreakdownService.breakdown) ? 'desc' : filter.params.sortDirection
                    },
                    payload: {
                        ...filter.payload,
                        rangeFrom: prepareFilter.getDate.rangeFrom,
                        rangeTo: prepareFilter.getDate.rangeTo,
                        ...prepareFilter.payload
                    }
                };

                this.childrenFiltersService.setParentPayloadFilters(newFilter.payload.filters);
                this.childrenDateRangeService.setParentPayloadDate({
                    rangeFrom: newFilter.payload.rangeFrom,
                    rangeTo: newFilter.payload.rangeTo
                });
                return this.get(newFilter);
            }),
            take(1)
        );
    }

    clearChildren(): void {
        this._children$.next([]);
    }
}
