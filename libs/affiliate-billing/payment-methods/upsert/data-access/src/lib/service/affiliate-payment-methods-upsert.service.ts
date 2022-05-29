import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { CurrencyEnum } from '@scaleo/platform/currency/models';

import { AffiliatePaymentMethodsUpsertApi } from '../api/affiliate-payment-methods-upsert.api';
import { CreatePaymentMethodModel, PaymentMethodBySupportedCurrencyModel } from '../models/affiliate-payment-methods-upsert.model';

@Injectable()
export class AffiliatePaymentMethodsUpsertService {
    constructor(private readonly api: AffiliatePaymentMethodsUpsertApi) {}

    public index(currency: CurrencyEnum): Observable<PaymentMethodBySupportedCurrencyModel[]> {
        return this.api.index(currency);
    }

    public create(post: CreatePaymentMethodModel): Observable<CreatePaymentMethodModel> {
        return this.api.create(post);
    }

    public update(post: CreatePaymentMethodModel): Observable<CreatePaymentMethodModel> {
        return this.api.update(post);
    }

    public delete(id: number): Observable<void> {
        return this.api.delete(id).pipe(first());
    }
}
