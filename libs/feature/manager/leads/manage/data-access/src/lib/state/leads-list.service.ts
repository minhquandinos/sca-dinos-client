import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { guid } from '@datorama/akita';
import { debounceTime, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { SheetExtensionType } from '@scaleo/platform/data';
import { BaseReportInterface, BaseReportService, ReportUtil } from '@scaleo/reports/common';
import { ReportsClearTempFiltersService } from '@scaleo/reports/shared/filters/service';
import { ReportsService } from '@scaleo/reports/state';
import { ReportConversionsApi } from '@scaleo/reports/transactions/conversion/data-access';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { Filter2Interface } from '@scaleo/shared/services/filters';

import { LeadsListApi } from '../api/leads-list.api';
import { LeadsListModel } from '../models/leads-list.model';
import { LeadsListQuery } from './leads-list.query';
import { LeadsListStore } from './leads-list.store';

@Injectable()
export class LeadsListService extends BaseReportService<LeadsListStore, LeadsListQuery, LeadsListApi> implements BaseReportInterface {
    constructor(
        protected override store: LeadsListStore,
        protected override api: LeadsListApi,
        protected override query: LeadsListQuery,
        protected override clearedFilterService: ReportsClearTempFiltersService,
        protected override route: ActivatedRoute,
        protected override reportsService: ReportsService,
        private readonly reportConversionsApi: ReportConversionsApi
    ) {
        super(store, query, api, clearedFilterService, route, reportsService);
    }

    index(filters: Filter2Interface): Observable<LeadsListModel[]> {
        return this.api.get(filters).pipe(
            debounceTime(0),
            tap(({ pagination }) => {
                this.updatePagination(pagination);
            }),
            map(({ results }) =>
                results.map((item: LeadsListModel) => ({
                    ...item,
                    id: guid()
                }))
            ),
            tap((results) => {
                this.store.set(results);
            })
        );
    }

    getColumnsOptions(): Observable<ConfigTableColumn2Model[]> {
        return this.api.getColumnsOptions().pipe(
            map((columns) => {
                const restoreColumns: string = this.query.getValue().data.columns;
                return ReportUtil.restoreDefaultColumns(columns, restoreColumns);
            })
        );
    }

    exportData(format: SheetExtensionType, selectedTransactions: string[], lang: string): Observable<unknown> {
        return this.query.prepareParams$.pipe(
            map((filter) => this.prepareParamBeforeExport(filter, format, lang)),
            switchMap((filter) => this.reportConversionsApi.exportData(filter, selectedTransactions))
        );
    }

    deliverAgain(selectedTransactions: string[]): Observable<unknown> {
        return this.api.deliverAgain(selectedTransactions);
    }
}
