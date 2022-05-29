import { inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { WindowRefService } from '@scaleo/core/window-ref/service';
import {
    GetReportFiltersInterface,
    ReportFilter,
    ReportFilterModel,
    ReportFilterQueryParamsPrepare,
    ReportFiltersInterface,
    ReportFiltersSelectedInterface,
    textareaTypeFilter
} from '@scaleo/reports/shared/filters/common';
import { ReportsClearTempFiltersService } from '@scaleo/reports/shared/filters/service';
import { ReportsService } from '@scaleo/reports/state';
import { Filter2Interface } from '@scaleo/shared/services/filters';
import { UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

import { BaseReportInterface } from '../interfaces';
import { ReportUtil } from '../util/report.util';
import { BaseReportQuery } from './base-report.query';
import { BaseReportStore } from './base-report.store';
import { BaseReportState } from './base-report-state.model';

@Injectable()
export abstract class BaseReportService<
        S extends BaseReportStore<BaseReportState>,
        Q extends BaseReportQuery<BaseReportState>,
        A extends GetReportFiltersInterface
    >
    extends BaseEntityService<BaseReportState>
    implements BaseReportInterface, GetReportFiltersInterface, ReportFiltersSelectedInterface, OnDestroy
{
    updateColumnsSubject$: Subject<string> = new Subject<string>();

    private readonly window = inject(WindowRefService);

    private unsubscribe: Subject<void> = new Subject();

    protected constructor(
        protected store: S,
        protected query: Q,
        protected api: A,
        protected clearedFilterService: ReportsClearTempFiltersService,
        protected route: ActivatedRoute,
        protected readonly reportsService: ReportsService
    ) {
        super(store, query);

        this.clearedFilterService.clear$.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            this.resetTempFilters();
        });
        // this.initSupportQueryParams();
        // this.initDonorFilters();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    protected prepareParamBeforeExport(queryParams: Filter2Interface, format: string, lang: string): Filter2Interface {
        let newFilter: Filter2Interface = Util.cloneDeep(queryParams);
        newFilter = {
            ...newFilter,
            params: {
                ...newFilter.params,
                lang,
                format
            }
        };

        delete newFilter.params.perPage;
        delete newFilter.params.page;
        delete newFilter.params.fieldsType;

        return newFilter;
    }

    updateColumns(columns: string[]): void {
        const newColumns = columns.join(',');
        // this.store.updateColumns(newColumns);
        this.updateDataValue({ columns: newColumns });
        this.updateColumnsSubject$.next(newColumns);
    }

    updatePage(page: number): void {
        this.updateDataValue({ page });
    }

    updatePerPage(perPage: number): void {
        this.updateDataValue({ perPage });
    }

    updateSort(sort: UiTable2SortColumnModel): void {
        this.updateDataValue({ sort });
    }

    updatePagination(pagination: ApiPaginationModel): void {
        this.updateDataValue({ pagination });
    }

    updateLoading(): void {
        this.store.setLoading(true);
    }

    resetStore(): void {
        (this.store as any).set([]);
        this.store.setLoading(true);
    }

    resetTempFilters(): void {
        this.store.update((state) => ({
            data: {
                ...state.data,
                selectedFilters: ReportUtil.getSavedSelectedFilters(state.data.selectedFilters)
            }
        }));
    }

    selectedFilter(selectedFilters: ReportFilterModel[]): void {
        this.updateDataValue({ selectedFilters, page: 1 });
    }

    get getFilters$(): Observable<ReportFiltersInterface[]> {
        return this.api.getFilters$;
    }

    get filtersSelected$(): Observable<ReportFilterModel[]> {
        return this.query.filtersSelected$;
    }

    protected initSupportQueryParams(): Observable<Params> {
        return this.route.queryParams.pipe(
            filter((queryParams) => !Util.isEmpty(queryParams)),
            map((queryParams) => queryParams),
            tap((queryParams) => {
                const queryParamsToStore = new ReportFilterQueryParamsPrepare(queryParams);
                this.resetFilters();
                this.store.update((state) => ({
                    ...state,
                    data: {
                        ...state.data,
                        selectedFilters: ReportFilter.appendNewFilterValue2(
                            this.query.getDataValue('selectedFilters'),
                            queryParamsToStore.filters
                        )
                    }
                }));
                this.removeQueryParamsFromUrl(queryParams);
            })
        );
    }

    // protected initDonorFilters(): void {
    //     if (!Util.isEmpty(this.reportsService.donorFilters)) {
    //         const recipientFilters = this.getDataValue('selectedFilters')
    //             .filter((elem: any) => elem.isSaved)
    //             .map((elem: any) => ({
    //                 ...elem,
    //                 value: Array.isArray(elem.value) ? [] : undefined
    //             }));
    //         const selectedFilters = ReportFilter.appendNewFilterValue2(recipientFilters, this.reportsService.donorFilters);
    //         this.updateDataValue({ selectedFilters });
    //         this.reportsService.clearRecipientFilters();
    //     }
    // }

    private resetFilters(): void {
        const selectedFilters = (this.query.getDataValue('selectedFilters') as ReportFilterModel[])
            .filter((elem) => {
                return elem?.selected;
            })
            .map((elem) => {
                return {
                    ...elem,
                    value: textareaTypeFilter.includes(elem.filter) ? '' : []
                };
            });
        this.updateDataValue({ selectedFilters });
    }

    private removeQueryParamsFromUrl(queryParams: BaseObjectModel): void {
        const url = new URL(this.window.nativeWindow.location.href);
        Object.entries(queryParams).forEach(([key]) => {
            url.searchParams.delete(key);
        });
        this.window.nativeWindow.history.pushState(null, null, url.href);
    }
}
