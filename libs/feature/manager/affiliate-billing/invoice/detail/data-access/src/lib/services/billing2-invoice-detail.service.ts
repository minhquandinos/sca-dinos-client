import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import {
    BaseInvoiceDetailService,
    Billing2InvoiceDetailResponseModel,
    InvoiceDetailState,
    InvoiceInfoModel,
    InvoiceTransactionModel,
    InvoiceUpdateAmountRequestModel,
    InvoiceUpdateAmountResponseModel
} from '@scaleo/invoice/common';

import { Billing2InvoiceDetailApi } from '../api/billing2-invoice-detail.api';
import { ManagerInvoiceDetailQuery } from '../state/manager-invoice-detail.query';
import { ManagerInvoiceDetailStore } from '../state/manager-invoice-detail.store';

@Injectable()
export class Billing2InvoiceDetailService extends BaseInvoiceDetailService<InvoiceDetailState> {
    constructor(
        private api: Billing2InvoiceDetailApi,
        private jsonConvertService: JsonConvertService,
        protected store: ManagerInvoiceDetailStore,
        protected query: ManagerInvoiceDetailQuery
    ) {
        super(store, query);
    }

    show() {
        return this.api.show(this.id).pipe(
            tap((response) => {
                this.dataInfoMapper(response);
                this.dataTransactionMapper(response);
                // this.setHeaderTitle(response.invoice_number);
            })
        );
    }

    get data(): InvoiceInfoModel {
        return this.query.getValue().info;
    }

    updateAmount(payload: InvoiceUpdateAmountRequestModel): Promise<InvoiceUpdateAmountResponseModel> {
        return this.api
            .updateAmount(this.id, payload)
            .pipe(
                tap((response) => {
                    this.dataTransactionAfterChangeAmountMapper(response);
                })
            )
            .toPromise();
    }

    private dataTransactionAfterChangeAmountMapper(data: InvoiceUpdateAmountResponseModel): void {
        const newData: InvoiceTransactionModel = {
            ...this.query.getValue().transaction,
            adjustment: {
                amount: data?.adjustment_amount,
                name: data?.adjustment_title
            },
            advance: {
                ...this.query.getValue().transaction.advance,
                amount: data?.advance_plus_amount
            },
            summary: {
                ...this.query.getValue().transaction.summary,
                vat: data?.vat,
                vat_amount: data.vat_amount,
                subtotal: data?.subtotal_amount,
                advance: data?.advance_minus_amount,
                total: data?.amount
            },
            referral_amount: data.referral_amount
        };

        this.store.update((state) => ({
            ...state,
            transaction: newData
        }));
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
