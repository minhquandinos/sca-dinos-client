import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RestApiOptions, RestApiService } from '@scaleo/core/rest-api/service';
import { CurrencyEnum } from '@scaleo/platform/currency/models';

import { CreatePaymentMethodModel, PaymentMethodBySupportedCurrencyModel } from '../models/affiliate-payment-methods-upsert.model';

@Injectable()
export class AffiliatePaymentMethodsUpsertApi {
    constructor(private readonly rest: RestApiService) {}

    public index(currency: CurrencyEnum): Observable<PaymentMethodBySupportedCurrencyModel[]> {
        const options: RestApiOptions = {
            urlParameters: { currency }
        };
        return this.rest
            .get<PaymentMethodBySupportedCurrencyModel[]>('billing-affiliates-payments-methods-supported-currencies', options)
            .pipe(pluck('info', 'supported-currencies'));
    }

    public create(method: CreatePaymentMethodModel): Observable<CreatePaymentMethodModel> {
        return this.rest.post<CreatePaymentMethodModel>('billing-affiliates-payments-methods-create', method);
    }

    public update(method: CreatePaymentMethodModel): Observable<CreatePaymentMethodModel> {
        return this.rest.put<CreatePaymentMethodModel>('billing-affiliates-payments-methods-update', method);
    }

    public delete(id: number): Observable<any> {
        const options: RestApiOptions = {
            urlParameters: { id }
        };
        return this.rest.delete<CreatePaymentMethodModel>('billing-affiliates-payments-methods-delete', options);
    }
}
