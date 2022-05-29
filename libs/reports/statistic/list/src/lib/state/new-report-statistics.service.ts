import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { guid } from '@datorama/akita';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';

import { ApiPaginationModel, ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { SheetExtensionType } from '@scaleo/platform/data';
import { BaseReportInterface, BaseReportService, StatisticModel, StatisticsResponseModel } from '@scaleo/reports/common';
import { ReportFilterModel } from '@scaleo/reports/shared/filters/common';
import { ReportsClearTempFiltersService } from '@scaleo/reports/shared/filters/service';
import { ReportsService } from '@scaleo/reports/state';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { StatisticOutputParameterInterface } from '@scaleo/shared/components';
import { Filter2Interface } from '@scaleo/shared/services/filters';
import { UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';

import { NewReportStatisticsApi } from '../api/new-report-statistics.api';
import { NewReportStatisticsQuery } from './new-report-statistics.query';
import { NewReportStatisticsStore } from './new-report-statistics.store';
import { NewReportStatisticsBreakdownService } from './new-report-statistics-breakdown.service';

@Injectable()
export class NewReportStatisticsService
    extends BaseReportService<NewReportStatisticsStore, NewReportStatisticsQuery, NewReportStatisticsApi>
    implements BaseReportInterface
{
    constructor(
        protected store: NewReportStatisticsStore,
        protected api: NewReportStatisticsApi,
        protected query: NewReportStatisticsQuery,
        private breakdownService: NewReportStatisticsBreakdownService,
        private translate: TranslateService,
        protected clearedFilterService: ReportsClearTempFiltersService,
        protected readonly route: ActivatedRoute,
        protected readonly reportsService: ReportsService
    ) {
        super(store, query, api, clearedFilterService, route, reportsService);
        // super.initSupportQueryParams();
    }

    get(filter: Filter2Interface): Observable<ApiResponseWithPagination<StatisticsResponseModel>> {
        return this.api.getStatistics(filter);
    }

    getParent(filter: Filter2Interface): Observable<ApiResponseWithPagination<StatisticsResponseModel>> {
        return this.api.getStatistics(filter).pipe(
            tap(({ results, pagination }) => {
                this.setParentData(results, pagination);
            })
        );
    }

    private setParentData(results: StatisticsResponseModel, pagination: ApiPaginationModel): void {
        const { rows, totals } = results;

        const newRows =
            rows?.length > 0
                ? rows?.map((row) => ({
                      ...row,
                      id: guid(),
                      ...this.nullableIsFieldEmptyBreakdown()
                  }))
                : [];

        if (pagination?.current_page > 1) {
            this.store.add(newRows);
        } else {
            this.store.set(newRows);
        }

        this.addToBreakdownsMap(newRows);

        this.updateTotals(totals);
        this.store.updateStatisticPagination(pagination);
    }

    private addToBreakdownsMap(rows: StatisticModel[]): void {
        if (this.breakdownService.breakdowns.length > 0) {
            if (rows.length > 0) {
                rows.forEach((item) => {
                    this.breakdownService.addBreakdownToColumns(item.id);
                });
            } else {
                this.breakdownService.addBreakdownToColumns('empty');
            }
        }
    }

    // TODO refactor after change app-config-table-column to app-config-table-column2
    configTableParameters(): Observable<StatisticOutputParameterInterface[]> {
        const restoreColumns: string = this.query.getValue().data.columns;
        const savedColumnsArr = restoreColumns?.split(',');
        const isSavedColumns = savedColumnsArr?.length > 0;

        return this.api.configTableParameters().pipe(
            map((columns) =>
                columns.map((group) => {
                    return {
                        ...group,
                        items: group.items.map((column) => {
                            let defaultColumn = isSavedColumns ? 0 : column.default;

                            if (savedColumnsArr?.includes(column.key)) {
                                defaultColumn = savedColumnsArr.includes(column.key) ? 1 : 0;
                            }

                            return {
                                ...column,
                                default: defaultColumn
                            };
                        })
                    };
                })
            ),
            share()
        );
    }

    get statistics$(): Observable<StatisticModel[]> {
        return this.query.selectAll();
    }

    get loading$(): Observable<boolean> {
        return this.query.selectLoading();
    }

    setLoading(status: boolean): void {
        this.store.setLoading(status);
    }

    resetStoreEntities(): void {
        this.store.set([]);
        this.updateDataValue({ pagination: null });
        // TODO add method updateDataValues()
        this.updateDataValue({ page: 1 });
    }

    resetStore(): void {
        this.store.set([]);
        this.store.update((state) => ({
            data: {
                ...state.data,
                breakdownInColumns: [],
                breakdownColumnsTree: [],
                breakdowns: [],
                filterBreakdowns: [],
                totals: null,
                sort: null,
                page: 1,
                pagination: null
            }
        }));
    }

    updateFilterPage(page: number): void {
        this.store.update((state) => ({
            data: {
                ...state.data,
                page
            }
        }));
    }

    nullableIsFieldEmptyBreakdown(breakdown?: BreakdownEnum): { [key: string]: null } {
        const ignoreBreakdown = breakdown || this.breakdownService.first?.breakdown;
        return this.breakdownService.breakdowns
            .filter((el) => el.breakdown !== ignoreBreakdown)
            .reduce((obj, item) => ({ ...obj, [item.breakdown]: null }), {});
    }

    private updateTotals(totals: StatisticModel): void {
        this.store.updateStatisticTotals(totals);
    }

    clearTotals(): void {
        this.store.updateStatisticTotals({} as any);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateColumns(): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updatePage(): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updatePerPage(): void {}

    updateSort(sort: UiTable2SortColumnModel): void {
        this.store.update((state) => ({
            data: {
                ...state.data,
                sort
            }
        }));
    }

    exportData(format: SheetExtensionType): Observable<any> {
        const lang = this.translate.currentLang;

        return this.query.prepareFilter$().pipe(
            map((filter) => this.prepareParamBeforeExport(filter, format, lang)),
            switchMap((filter) => this.api.exportData(filter))
        );
    }

    selectedFilter(selectedFilters: ReportFilterModel[]): void {
        this.store.update((state) => ({
            data: {
                ...state.data,
                selectedFilters
            }
        }));
    }

    updateCurrency(currency: CurrencyEnum): void {
        this.store.update((state) => ({
            data: {
                ...state.data,
                currency
            }
        }));
    }

    initSupportQueryParams(): Observable<Params> {
        return super.initSupportQueryParams();
    }
}
