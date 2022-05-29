import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseStateService } from '@scaleo/core/state/state';
import { affiliateInvoicesWidgetColumns } from '@scaleo/feature/manager/affiliate-billing/invoice/widgets/invoices/common';

import { ManagerInvoicesWidgetApi } from '../api/manager-invoices-widget.api';
import { AffiliateInvoicesWidgetModel } from '../models/affiliate-invoices-widget.model';
import { ManagerInvoicesWidgetQuery } from '../state/manager-invoices-widget.query';
import { AffiliateInvoicesWidgetState, ManagerInvoicesWidgetStore } from '../state/manager-invoices-widget.store';

@Injectable()
export class ManagerInvoicesWidgetService extends BaseStateService<AffiliateInvoicesWidgetState> {
    constructor(
        private api: ManagerInvoicesWidgetApi,
        private jsonConvertService: JsonConvertService,
        protected store: ManagerInvoicesWidgetStore,
        protected query: ManagerInvoicesWidgetQuery
    ) {
        super(store, query);
    }

    index(affiliateId: number): Observable<AffiliateInvoicesWidgetModel[]> {
        const observable = this.api
            .index({
                perPage: 10,
                page: 1,
                columns: this.columns,
                affiliates: affiliateId.toString()
            })
            .pipe(
                tap(({ results, pagination }) => {
                    this.store.update({
                        invoices: this.jsonConvertService.mapper(AffiliateInvoicesWidgetModel, results),
                        total: pagination.total_count
                    });
                })
            );
        return this.observable(observable).pipe(map(({ results }) => results));
    }

    get columns(): string {
        return affiliateInvoicesWidgetColumns.map((column) => column.value).join(',');
    }

    updateDate(data: AffiliateInvoicesWidgetState): void {
        this.store.update({ ...data });
    }
}
