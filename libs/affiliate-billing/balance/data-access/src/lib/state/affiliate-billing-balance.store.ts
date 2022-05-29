import { Injectable } from '@angular/core';
import { guid, StoreConfig } from '@datorama/akita';

import { BaseStateStore, createBaseInitialState } from '@scaleo/core/state/state';

import { AffiliateBillingBalanceModel } from '../models/affiliate-billing-balance.model';

const initialState = createBaseInitialState({
    approved_balance: 0,
    pending_balance: 0,
    balance_due: 0,
    balance_due_by_currencies: [],
    available_advance: 0,
    currency: undefined
});

@Injectable()
@StoreConfig({ name: `billing-balance-widget-${guid()}`, resettable: true })
export class AffiliateBillingBalanceStore extends BaseStateStore<AffiliateBillingBalanceModel> {
    constructor() {
        super(initialState);
    }
}
