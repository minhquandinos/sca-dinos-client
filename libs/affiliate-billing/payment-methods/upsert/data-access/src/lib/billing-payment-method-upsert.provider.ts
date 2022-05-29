import { Provider } from '@angular/core';

import { AffiliatePaymentMethodsUpsertApi } from './api/affiliate-payment-methods-upsert.api';
import { AffiliatePaymentMethodsUpsertService } from './service/affiliate-payment-methods-upsert.service';

export const BILLING_PAYMENT_METHOD_UPSERT: Provider[] = [AffiliatePaymentMethodsUpsertApi, AffiliatePaymentMethodsUpsertService];
