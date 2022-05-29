import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { ServiceLocator } from '@scaleo/core/locator/service';
import { BaseEntityQuery, BaseEntityState, BaseEntityStore } from '@scaleo/core/state/entiy-state';
import { WindowRefService } from '@scaleo/core/window-ref/service';
import { ReportFilter, ReportFilterModel, ReportFiltersSelectedInterface } from '@scaleo/reports/shared/filters/common';
import { ReportsService } from '@scaleo/reports/state';
import {
    Filter2Interface,
    GetFilterInterface,
    Post2FiltersInterface,
    RequestPayloadFilter2Interface
} from '@scaleo/shared/services/filters';
import { UiTable2ColumnsModel, UiTable2SortColumnModel } from '@scaleo/ui-kit/elements';
import { objectUtil } from '@scaleo/utils';

import { reportColumnHideSort } from '../model/reports.model';

@Injectable()
export class BaseReportQuery<T extends BaseEntityState<T> = any> extends BaseEntityQuery<T> implements ReportFiltersSelectedInterface {
    protected window: WindowRefService;

    constructor(protected store: BaseEntityStore<T>, protected reportsService: ReportsService) {
        super(store);
        this.window = ServiceLocator.injector.get(WindowRefService);
    }

    get sort$(): Observable<UiTable2SortColumnModel> {
        return this.selectDataValue$('sort');
    }

    get page$(): Observable<number> {
        return this.selectDataValue$('page');
    }

    get perPage$(): Observable<number> {
        return this.selectDataValue$('perPage');
    }

    get columnsPayload$(): Observable<string> {
        return this.selectDataValue$('columns');
    }

    get columns$(): Observable<UiTable2ColumnsModel[]> {
        return this.columnsPayload$.pipe(
            map((columns) =>
                columns?.split(',').map((column) => ({
                    value: column,
                    translate: `table.column.${column}`,
                    sort: reportColumnHideSort(column)
                }))
            )
        );
    }

    get filters$(): Observable<RequestPayloadFilter2Interface> {
        return this.filtersSelected$.pipe(
            distinctUntilChanged((x, y) => {
                const flt1 = this.window.nativeWindow.btoa(JSON.stringify(x));
                const flt2 = this.window.nativeWindow.btoa(JSON.stringify(y));
                return flt1 === flt2;
            }),
            map((filters) => ReportFilter.convertFiltersValueToRequest(filters))
        );
    }

    get prepareParams$(): Observable<Filter2Interface> {
        return objectUtil.mutationKeyWhenValuesChanges(this.paramsAndPayload$, 'page', 1).pipe(
            switchMap(({ sortField, sortDirection, page, perPage, rangeFrom, rangeTo, columns, filters }) =>
                of({
                    params: {
                        sortField,
                        sortDirection,
                        page,
                        perPage,
                        fieldsType: 'object'
                    },
                    payload: {
                        rangeFrom,
                        rangeTo,
                        columns,
                        filters
                    }
                })
            )
        );
    }

    get filtersSelected$(): Observable<ReportFilterModel[]> {
        return this.selectDataValue$('selectedFilters');
    }

    protected get paramsAndPayload$(): Observable<Post2FiltersInterface & GetFilterInterface> {
        return combineLatest([this.columnsPayload$, this.sort$, this.reportsService.date$, this.page$, this.perPage$, this.filters$]).pipe(
            switchMap(([columns, sort, date, page, perPage, filters]) => {
                return of({
                    rangeFrom: date?.rangeFrom,
                    rangeTo: date?.rangeTo,
                    columns,
                    filters,
                    sortField: sort?.field || null,
                    sortDirection: sort?.direction ? sort?.direction : 'desc',
                    page,
                    perPage,
                    fieldsType: 'object'
                });
            })
        );
    }
}
