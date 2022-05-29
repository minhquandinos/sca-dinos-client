import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { guid } from '@datorama/akita';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { SheetExtensionType } from '@scaleo/platform/data';
import { BaseReportInterface, BaseReportService, ReportUtil, StatisticModel } from '@scaleo/reports/common';
import { ReportsClearTempFiltersService } from '@scaleo/reports/shared/filters/service';
import { ReportsQuery, ReportsService } from '@scaleo/reports/state';
import { BaseTransactionListReportServiceInterface } from '@scaleo/reports/transactions/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { Filter2Interface } from '@scaleo/shared/services/filters';

import { ReportConversionsApi } from '../api/report-conversions.api';
import { ReportConversionsQuery } from './report-conversions.query';
import { ReportConversionsStore } from './report-conversions.store';

@Injectable()
export class ReportConversionsService
    extends BaseReportService<ReportConversionsStore, ReportConversionsQuery, ReportConversionsApi>
    implements BaseReportInterface, BaseTransactionListReportServiceInterface
{
    constructor(
        protected store: ReportConversionsStore,
        protected api: ReportConversionsApi,
        protected query: ReportConversionsQuery,
        private translate: TranslateService,
        protected clearedFilterService: ReportsClearTempFiltersService,
        protected readonly route: ActivatedRoute,
        protected readonly reportsQuery: ReportsQuery,
        protected readonly reportsService: ReportsService
    ) {
        super(store, query, api, clearedFilterService, route, reportsService);
    }

    index(filters?: Filter2Interface): Observable<StatisticModel[]> {
        return this.api.index(filters).pipe(
            tap(({ pagination }) => {
                this.updatePagination(pagination);
            }),
            map(({ results }) =>
                results.map((item: any) => ({
                    ...item,
                    id: guid()
                }))
            ),
            tap((entities) => {
                this.store.set(entities);
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

    exportData(format: SheetExtensionType, selectedTransactions: string[]): Observable<any> {
        const lang = this.translate.currentLang;

        return this.query.prepareParams$.pipe(
            map((filter) => this.prepareParamBeforeExport(filter, format, lang)),
            switchMap((filter) => this.api.exportData(filter, selectedTransactions))
        );
    }

    initSupportQueryParams(): Observable<Params> {
        return super.initSupportQueryParams();
    }
}
