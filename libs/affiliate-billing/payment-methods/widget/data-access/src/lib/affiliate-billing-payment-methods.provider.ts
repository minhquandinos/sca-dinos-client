import { Provider } from '@angular/core';

import { BillingAffiliatePaymentsMethodsApi } from './api/billing-affiliate-payments-methods.api';
import { AffiliateBillingPaymentMethodsQuery } from './state/affiliate-billing-payment-methods.query';
import { AffiliateBillingPaymentMethodsStore } from './state/affiliate-billing-payment-methods.store';
import { AffiliateBillingPaymentsMethodsService } from './state/affiliate-billing-payments-methods.service';

export const AFFILIATE_BILLING_PAYMENT_METHODS_PROVIDER: Provider[] = [
    AffiliateBillingPaymentsMethodsService,
    BillingAffiliatePaymentsMethodsApi,
    AffiliateBillingPaymentMethodsQuery,
    AffiliateBillingPaymentMethodsStore
];
