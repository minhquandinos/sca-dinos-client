import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BaseStateQuery, BaseStateService, BaseStateStore } from '@scaleo/core/state/state';

import { Billing2InvoiceDetailResponseModel } from './models/invoice-detail-info.model';
import { InvoiceTransactionModel } from './models/invoice-transaction.model';

@Injectable()
export class BaseInvoiceDetailService<T> extends BaseStateService<T> {
    private _id$: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);

    readonly id$ = this._id$.asObservable();

    protected constructor(protected store: BaseStateStore<T>, protected query: BaseStateQuery<T>) {
        super(store, query);
    }

    set id(id: number) {
        this._id$.next(id);
    }

    get id(): number {
        return this._id$.value;
    }

    protected prepareTransactionData(data: Billing2InvoiceDetailResponseModel): InvoiceTransactionModel {
        const { items, adjustments, adjustments_info, advance_plus, vat, vat_amount, advance_minus, total, subtotal, referral_amount } =
            data;

        return {
            items,
            adjustment: { amount: adjustments, name: adjustments_info },
            advance: { amount: advance_plus },
            summary: {
                vat,
                advance: advance_minus,
                total,
                subtotal,
                vat_amount
            },
            referral_amount
        };
    }
}
