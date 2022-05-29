import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { guid } from '@datorama/akita';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { SheetExtensionType } from '@scaleo/platform/data';
import { BaseReportInterface, BaseReportService, ReportUtil, StatisticModel } from '@scaleo/reports/common';
import { ReportsClearTempFiltersService } from '@scaleo/reports/shared/filters/service';
import { ReportsService } from '@scaleo/reports/state';
import { BaseTransactionListReportServiceInterface } from '@scaleo/reports/transactions/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';
import { Filter2Interface } from '@scaleo/shared/services/filters';

import { ReportAffiliatesPostbacksApi } from '../api/report-affiliates-postbacks.api';
import { ReportAffiliatesPostbacksQuery } from './report-affiliates-postbacks.query';
import { ReportAffiliatesPostbacksStore } from './report-affiliates-postbacks.store';

@Injectable()
export class ReportAffiliatesPostbacksService
    extends BaseReportService<ReportAffiliatesPostbacksStore, ReportAffiliatesPostbacksQuery, ReportAffiliatesPostbacksApi>
    implements BaseReportInterface, BaseTransactionListReportServiceInterface
{
    constructor(
        protected store: ReportAffiliatesPostbacksStore,
        protected query: ReportAffiliatesPostbacksQuery,
        protected api: ReportAffiliatesPostbacksApi,
        protected clearedFilterService: ReportsClearTempFiltersService,
        private readonly translate: TranslateService,
        protected readonly route: ActivatedRoute,
        protected readonly reportsService: ReportsService
    ) {
        super(store, query, api, clearedFilterService, route, reportsService);
    }

    index(filters?: Filter2Interface): Observable<StatisticModel[]> {
        return this.api.get(filters, 'reports-affiliates-postbacks-log').pipe(
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
        const restoreColumns: string = this.query.getValue().data.columns;

        return this.api
            .getColumnsOptions('reports-affiliates-postbacks-log-options')
            .pipe(map((columns) => ReportUtil.restoreDefaultColumns(columns, restoreColumns)));
    }

    exportData(format: SheetExtensionType): Observable<any> {
        const lang = this.translate.currentLang;

        return this.query.prepareParams$.pipe(
            map((filter) => this.prepareParamBeforeExport(filter, format, lang)),
            switchMap((filter) => this.api.exportData(filter))
        );
    }

    initSupportQueryParams(): Observable<Params> {
        return super.initSupportQueryParams();
    }
}
