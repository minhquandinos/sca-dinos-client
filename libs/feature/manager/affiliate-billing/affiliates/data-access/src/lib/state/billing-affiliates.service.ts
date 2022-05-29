import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, pluck, switchMap, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { SheetExtensionType } from '@scaleo/platform/data';
import { ReportUtil } from '@scaleo/reports/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';

import { BillingAffiliatesApi } from '../api/billing-affiliates.api';
import {
    BillingAffiliateBalanceDue,
    BillingAffiliatesExportRequestModel,
    BillingAffiliatesModel,
    BillingAffiliatesRequestModel
} from '../models/billing-affiliates.model';
import { BillingAffiliatesQuery } from './billing-affiliates.query';
import { BillingAffiliatesState, BillingAffiliatesStore } from './billing-affiliates.store';

@Injectable()
export class BillingAffiliatesService extends BaseEntityService<BillingAffiliatesState> {
    constructor(
        private readonly api: BillingAffiliatesApi,
        protected readonly query: BillingAffiliatesQuery,
        protected readonly store: BillingAffiliatesStore,
        private readonly translate: TranslateService,
        private readonly jsonConvertService: JsonConvertService
    ) {
        super(store, query);
    }

    get getBillingAffiliateList$(): Observable<BillingAffiliatesModel[]> {
        return this.query.prepareParams$.pipe(
            debounceTime(300),
            filter((params) => !!params.columns),
            tap(() => {
                this.store.setLoading(true);
            }),
            switchMap((params) => this.api.list(params)),
            tap((response) => {
                const { pagination } = response;
                this.updateDataValue({ pagination });
            }),
            pluck('results'),
            map((results) =>
                results.map((item: any) => ({
                    ...item,
                    id: guid()
                }))
            ),
            map((affiliates) => this.jsonConvertService.mapper(BillingAffiliatesModel, affiliates)),
            tap((billingAffiliates: BillingAffiliatesModel[]) => {
                this.store.set(billingAffiliates);
                this.store.setLoading(false);
            })
        );
    }

    getColumnsOptions(): Observable<ConfigTableColumn2Model[]> {
        const restoreColumns: string = this.query.getValue().params.columns || null;

        return this.api.getColumnsOptions().pipe(map((columns) => ReportUtil.restoreDefaultColumns(columns, restoreColumns)));
    }

    exportData(format: SheetExtensionType, selectedBillingAffiliates: number[]): Observable<HttpResponse<ArrayBuffer>> {
        return this.query.prepareParams$.pipe(
            switchMap((filters: BillingAffiliatesRequestModel) => {
                const params: BillingAffiliatesExportRequestModel = {
                    ...filters,
                    lang: this.translate.currentLang,
                    affiliate_ids: selectedBillingAffiliates.join(','),
                    format
                };
                return this.api.exportData(params);
            })
        );
    }

    getBalanceDue(): Observable<BillingAffiliateBalanceDue> {
        return this.api.getBalanceDue();
    }
}
