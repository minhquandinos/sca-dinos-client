import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { ApiResponseWithPagination, ResponseUtil } from '@scaleo/core/rest-api/service';
import { WidgetServiceInterface } from '@scaleo/dashboard/common';
import { DashboardToolbarService } from '@scaleo/dashboard/service';
import { BreakdownEnum } from '@scaleo/reports/statistic/common';
import { UiTableSortInterface } from '@scaleo/ui-kit/elements';

import { MgcomTopApi } from '../api/mgcom-top.api';
import { MgcomTopState } from '../state/mgcom-top.state';
import { MgcomTopInterface } from '../types/mgcom-top.interface';

@Injectable()
export class MgcomTopFacade implements WidgetServiceInterface<MgcomTopInterface[]> {
    get widgetData$(): Observable<ApiResponseWithPagination<MgcomTopInterface[]>> {
        return this.load();
    }

    widgetSubject$: Subject<any> = new Subject<any>();

    constructor(private api: MgcomTopApi, private state: MgcomTopState, private dashboardToolbarService: DashboardToolbarService) {}

    private load(): Observable<ApiResponseWithPagination<MgcomTopInterface[]>> {
        return this.widgetSubject$.pipe(
            startWith(''),
            switchMap(() => combineLatest([this.dashboardToolbarService.dateRange$, this.state.widgetFilters$])),
            map(([date, filter]) => ({
                params: {
                    ...filter.params
                },
                payload: {
                    ...filter.payload,
                    rangeFrom: date.rangeFrom,
                    rangeTo: date.rangeTo
                }
            })),
            tap((filters) => {
                if (filters.params.page === 1) {
                    this.state.loaded(false);
                }
            }),
            switchMap((filters) => this.api.index(filters)),
            map((response) => {
                const {
                    headers,
                    body: {
                        info: { rows }
                    }
                } = response;
                return ResponseUtil.pagination(headers, rows);
            }),
            tap((data) => {
                this.state.setData(data);
                this.state.loaded(true);
            })
        );
    }

    sorted(sort: UiTableSortInterface) {
        this.state.sortingData(sort);
    }

    filteredManager(id: number[]) {
        this.state.filteredDataByManager(id);
    }

    pagination() {
        this.state.nextPage();
    }

    switchTab(tab: BreakdownEnum) {
        this.state.switchTab(tab);
    }
}
