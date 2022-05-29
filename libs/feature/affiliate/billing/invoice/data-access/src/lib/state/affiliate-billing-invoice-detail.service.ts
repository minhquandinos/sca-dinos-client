import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import {
    BaseInvoiceDetailService,
    Billing2InvoiceDetailResponseModel,
    InvoiceDetailState,
    InvoiceInfoModel,
    InvoiceTransactionModel
} from '@scaleo/invoice/common';
import { InvoiceApi } from '@scaleo/invoice/data-access';

import { AffiliateBillingInvoiceDetailQuery } from './affiliate-billing-invoice-detail.query';
import { AffiliateBillingInvoiceDetailStore } from './affiliate-billing-invoice-detail.store';

@Injectable()
export class AffiliateBillingInvoiceDetailService extends BaseInvoiceDetailService<InvoiceDetailState> {
    constructor(
        private api: InvoiceApi,
        protected store: AffiliateBillingInvoiceDetailStore,
        protected query: AffiliateBillingInvoiceDetailQuery,
        private jsonConvertService: JsonConvertService
    ) {
        super(store, query);
    }

    show() {
        return this.api.show(this.id).pipe(
            tap((response) => {
                this.dataInfoMapper(response);
                this.dataTransactionMapper(response);
            })
        );
    }

    private dataInfoMapper(data: Billing2InvoiceDetailResponseModel): void {
        this.store.update({
            info: this.jsonConvertService.mapper(InvoiceInfoModel, data)
        });
    }

    private dataTransactionMapper(data: Billing2InvoiceDetailResponseModel): void {
        this.store.update({
            transaction: this.jsonConvertService.mapper(InvoiceTransactionModel, this.prepareTransactionData(data))
        });
    }
}
