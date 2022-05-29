import { Injectable } from '@angular/core';
import { guid, StoreConfig } from '@datorama/akita';

import { BaseEntityState, BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';

import { BillingAffiliatePaymentsMethodModel } from '../models/billing-affiliate-payments-method.model';

export type AffiliateBillingPaymentMethodsState = BaseEntityState<BillingAffiliatePaymentsMethodModel>;

const initialState = createEntityInitialState<AffiliateBillingPaymentMethodsState>({});

@Injectable()
@StoreConfig({ name: `affiliate-billing-payment-methods-${guid()}` })
export class AffiliateBillingPaymentMethodsStore extends BaseEntityStore<AffiliateBillingPaymentMethodsState> {
    constructor() {
        super(initialState);
    }
}
