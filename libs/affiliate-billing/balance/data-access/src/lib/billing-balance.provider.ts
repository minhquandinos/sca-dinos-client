import { Provider } from '@angular/core';

import { AffiliateBillingBalanceApi } from './api/affiliate-billing-balance.api';
import { AffiliateBillingBalanceQuery } from './state/affiliate-billing-balance.query';
import { AffiliateBillingBalanceService } from './state/affiliate-billing-balance.service';
import { AffiliateBillingBalanceStore } from './state/affiliate-billing-balance.store';

export const BILLING_BALANCE_PROVIDER: Provider[] = [
    AffiliateBillingBalanceService,
    AffiliateBillingBalanceQuery,
    AffiliateBillingBalanceApi,
    AffiliateBillingBalanceStore
];
