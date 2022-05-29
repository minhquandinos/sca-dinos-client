import { Expose } from 'class-transformer';

import { CurrencyEnum } from '@scaleo/platform/currency/models';

export interface BalanceDueByCurrencyModel {
    currency: CurrencyEnum;
    amount: number;
}

export class AffiliateBillingBalanceModel {
    @Expose()
    approved_balance = 0;

    @Expose()
    pending_balance = 0;

    @Expose()
    balance_due = 0;

    // remove as optional parameters when server will be complete
    @Expose()
    balance_due_by_currencies: BalanceDueByCurrencyModel[] = [];

    @Expose()
    available_advance = 0;

    @Expose()
    currency: CurrencyEnum = undefined;
}
