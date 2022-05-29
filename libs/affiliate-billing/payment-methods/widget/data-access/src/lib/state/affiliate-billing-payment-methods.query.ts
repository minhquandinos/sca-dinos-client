import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AffiliateBillingPaymentMethodsState, AffiliateBillingPaymentMethodsStore } from './affiliate-billing-payment-methods.store';

@Injectable()
export class AffiliateBillingPaymentMethodsQuery extends BaseEntityQuery<AffiliateBillingPaymentMethodsState> {
    constructor(protected store: AffiliateBillingPaymentMethodsStore) {
        super(store);
    }
}
