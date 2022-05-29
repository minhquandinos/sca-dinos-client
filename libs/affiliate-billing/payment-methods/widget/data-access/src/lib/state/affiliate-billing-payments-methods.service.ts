import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { BaseEntityService } from '@scaleo/core/state/entiy-state';
import { CurrencyEnum } from '@scaleo/platform/currency/models';

import {
    RequestPaymentModalOutputModel,
    SendPaymentRequestResponseDto
} from '../../../../list/src/lib/components/request-payment-modal/models/request-payment-modal.model';
import { BillingAffiliatePaymentsMethodsApi } from '../api/billing-affiliate-payments-methods.api';
import {
    AffiliateBillingPayloadParamsDto,
    AffiliateBillingPaymentsMethodDetailDto,
    BillingAffiliatePaymentsMethodModel
} from '../models/billing-affiliate-payments-method.model';
import { AffiliateBillingPaymentMethodsQuery } from './affiliate-billing-payment-methods.query';
import { AffiliateBillingPaymentMethodsState, AffiliateBillingPaymentMethodsStore } from './affiliate-billing-payment-methods.store';

@Injectable()
export class AffiliateBillingPaymentsMethodsService extends BaseEntityService<AffiliateBillingPaymentMethodsState> {
    // readonly paymentsLoading$ = this.loading$;

    constructor(
        private readonly api: BillingAffiliatePaymentsMethodsApi,
        private readonly jsonConvertService: JsonConvertService,
        protected query: AffiliateBillingPaymentMethodsQuery,
        protected store: AffiliateBillingPaymentMethodsStore
    ) {
        super(store, query);
    }

    index(id: number): Observable<BillingAffiliatePaymentsMethodModel[]> {
        const observable = this.api.index(id).pipe(
            map((paymentsMethods: AffiliateBillingPaymentsMethodDetailDto[]) =>
                this.jsonConvertService.mapper<BillingAffiliatePaymentsMethodModel>(BillingAffiliatePaymentsMethodModel, paymentsMethods)
            ),
            tap((payments: BillingAffiliatePaymentsMethodModel[]) => {
                const newPayments = payments.map((payment) => {
                    return {
                        ...payment,
                        id: payment?.id || guid()
                    };
                });
                this.store.set(newPayments);
            })
        );
        return this.observable(observable);
    }

    sendPaymentRequest(
        id: string | number,
        data: RequestPaymentModalOutputModel & { currency: CurrencyEnum; affiliateId: number }
    ): Observable<SendPaymentRequestResponseDto> {
        const { affiliateId: affiliate_id, currency, attachment_file, amount } = data;
        const body: AffiliateBillingPayloadParamsDto = {
            affiliate_id,
            currency,
            attachment_file,
            amount
        };

        return this.api.sendPaymentRequest(body).pipe(
            tap(() => {
                this.store.update(id, (state) => {
                    const approvedBalance = amount && state?.approved_balance ? state?.approved_balance - amount : 0;
                    return {
                        ...state,
                        approved_balance: approvedBalance
                    };
                });
            })
        );
    }

    // updateMethod(id: number, newValue: BillingAffiliatePaymentsMethodModel): void {
    //     this.data = ArrayUtil.updateByKey(this.data, 'id', id, newValue);
    // }
}
