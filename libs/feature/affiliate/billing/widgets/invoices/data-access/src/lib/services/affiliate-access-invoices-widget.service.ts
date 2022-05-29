import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { delay, map, pluck, startWith, switchMap, take, tap } from 'rxjs/operators';

import { ApiResponseWithPagination } from '@scaleo/core/rest-api/service';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { Billing2InvoicesExportRequestModel, InvoicesModel, InvoicesRequestModel, InvoicesServiceInterface } from '@scaleo/invoice/common';
import { InvoicesApi } from '@scaleo/invoice/data-access';
import { SheetExtensionType } from '@scaleo/platform/data';
import { ReportUtil } from '@scaleo/reports/common';
import { ConfigTableColumn2Model } from '@scaleo/shared/components';

import { AffiliateAccessInvoicesWidgetQuery } from '../state/affiliate-access-invoices-widget.query';
import { AffiliateAccessInvoicesState, AffiliateAccessInvoicesWidgetStore } from '../state/affiliate-access-invoices-widget.store';

@Injectable({ providedIn: 'root' })
export class AffiliateAccessInvoicesWidgetService
    extends BaseEntityService<AffiliateAccessInvoicesState>
    implements InvoicesServiceInterface
{
    readonly reloadItems$: Subject<void> = new Subject();

    constructor(
        protected store: AffiliateAccessInvoicesWidgetStore,
        private api: InvoicesApi,
        protected query: AffiliateAccessInvoicesWidgetQuery,
        private jsonConvertService: JsonConvertService,
        private translate: TranslateService
    ) {
        super(store, query);
    }

    index(): Observable<InvoicesModel[]> {
        return combineLatest([this.query.updated$, this.reloadItems$.pipe(startWith(''))]).pipe(
            delay(200),
            tap((): any => this.store.setLoading(true)),
            switchMap(([params]) => this.api.index(params as InvoicesRequestModel)),
            tap((response: ApiResponseWithPagination<InvoicesModel[]>) => {
                this.updateDataValue({ pagination: response.pagination });
            }),
            pluck('results'),
            map((results) => this.jsonConvertService.mapper(InvoicesModel, results)),
            tap((invoices: InvoicesModel[]) => {
                this.store.set(invoices);
                this.store.setLoading(false);
            })
        );
    }

    getColumnsOptions(): Observable<ConfigTableColumn2Model[]> {
        const restoreColumns: string = this.query.getValue().params.columns || null;

        return this.api.getOption().pipe(map((columns) => ReportUtil.restoreDefaultColumns(columns, restoreColumns)));
    }

    exportData(format: SheetExtensionType, selected: number[]): Promise<HttpResponse<ArrayBuffer>> {
        return this.query.updated$
            .pipe(
                switchMap((filters) => {
                    const { sortDirection, sortField, columns } = filters;
                    const params: Billing2InvoicesExportRequestModel = {
                        sortField,
                        sortDirection,
                        columns,
                        lang: this.translate.currentLang,
                        format,
                        invoices: selected.join(',')
                    };
                    return this.api.exportData(params);
                }),
                take(1)
            )
            .toPromise();
    }

    reloadItems(): void {
        this.reloadItems$.next();
    }
}
