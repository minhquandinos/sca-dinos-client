import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import { delay, map, pluck, startWith, switchMap, take, tap } from 'rxjs/operators';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import {
    Billing2InvoiceAttachmentRequestModel,
    Billing2InvoicesExportRequestModel,
    Billing2InvoiceUpdateRequestModel,
    Billing2InvoiceUpdateResponseModel,
    InvoicesAmount,
    InvoicesModel,
    InvoicesRequestModel,
    InvoicesServiceInterface
} from '@scaleo/invoice/common';
import { SheetExtensionType } from '@scaleo/platform/data';
import { ReportUtil } from '@scaleo/reports/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';

import { Billing2InvoicesApi } from '../api/billing2-invoices.api';
import { Billing2InvoicesQuery } from '../state/billing2-invoices.query';
import { Billing2InvoicesState, Billing2InvoicesStore } from '../state/billing2-invoices.store';

@Injectable()
export class Billing2InvoicesService extends BaseEntityService<Billing2InvoicesState> implements InvoicesServiceInterface {
    constructor(
        protected store: Billing2InvoicesStore,
        private api: Billing2InvoicesApi,
        protected query: Billing2InvoicesQuery,
        private jsonConvertService: JsonConvertService,
        private translate: TranslateService
    ) {
        super(store, query);
    }

    index(): Observable<InvoicesModel[]> {
        return combineLatest([this.query.updated$, this.query.reloading$.pipe(startWith(''))]).pipe(
            delay(200),
            switchMap(([params]) => this.api.index(params as InvoicesRequestModel)),
            tap((response: ApiResponseWithPagination<InvoicesModel[]>) => {
                this.updateDataValue({ pagination: response.pagination });
            }),
            pluck('results'),
            map((results) => this.jsonConvertService.mapper(InvoicesModel, results)),
            tap((invoices: InvoicesModel[]) => {
                this.store.set(invoices);
                if (this.query.getValue().loading) {
                    this.store.setLoading(false);
                }
            })
        );
    }

    add(billing2Invoice: InvoicesModel): void {
        this.store.add(billing2Invoice);
    }

    // TODO fixed update store with jsonConvertService
    update(id: number, billing2Invoice: Partial<InvoicesModel>): void {
        this.store.update(id, billing2Invoice);
    }

    remove(id: ID): void {
        this.store.remove(id);
    }

    getColumnsOptions(): Observable<ConfigTableColumn2Model[]> {
        const restoreColumns: string = this.query.getValue().params.columns || null;

        return this.api.getOption().pipe(map((columns) => ReportUtil.restoreDefaultColumns(columns, restoreColumns)));
    }

    reloadItems(): void {
        this.reload();
    }

    exportData(format: SheetExtensionType, selected: number[]): Promise<HttpResponse<ArrayBuffer>> {
        return firstValueFrom(
            this.query.updated$.pipe(
                switchMap((filters) => {
                    const { sortDirection, sortField, columns, affiliates, statuses, payments_methods, currencies, rangeFrom, rangeTo } =
                        filters;
                    const params: Billing2InvoicesExportRequestModel = {
                        sortField,
                        sortDirection,
                        columns,
                        lang: this.translate.currentLang,
                        affiliates,
                        statuses,
                        payments_methods,
                        currencies,
                        format,
                        invoices: selected.join(','),
                        rangeFrom,
                        rangeTo
                    };
                    return this.api.exportData(params);
                }),
                take(1)
            )
        );
    }

    uploadAttachment(
        id: number,
        payload: Billing2InvoiceUpdateRequestModel | Billing2InvoiceAttachmentRequestModel
    ): Promise<Billing2InvoiceUpdateResponseModel> {
        return this.api.uploadAttachment(id, payload).toPromise();
    }

    getAmount(): Observable<InvoicesAmount> {
        return this.api.getAmount();
    }
}
