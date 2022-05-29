import { Provider } from '@angular/core';

import { AffiliateBillingInvoiceDetailQuery } from './state/affiliate-billing-invoice-detail.query';
import { AffiliateBillingInvoiceDetailService } from './state/affiliate-billing-invoice-detail.service';
import { AffiliateBillingInvoiceDetailStore } from './state/affiliate-billing-invoice-detail.store';

export const AFFILIATE_BILLING_INVOICE_DETAIL_PROVIDER: Provider[] = [
    AffiliateBillingInvoiceDetailQuery,
    AffiliateBillingInvoiceDetailStore,
    AffiliateBillingInvoiceDetailService
];
