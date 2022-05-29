import { Injectable } from '@angular/core';

import { BaseStateQuery } from '@scaleo/core/state/state';

import { AffiliateBillingBalanceModel } from '../models/affiliate-billing-balance.model';
import { AffiliateBillingBalanceStore } from './affiliate-billing-balance.store';

@Injectable()
export class AffiliateBillingBalanceQuery extends BaseStateQuery<AffiliateBillingBalanceModel> {
    constructor(protected store: AffiliateBillingBalanceStore) {
        super(store);
    }
}
