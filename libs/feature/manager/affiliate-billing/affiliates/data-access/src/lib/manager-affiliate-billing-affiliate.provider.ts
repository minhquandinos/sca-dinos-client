import { Provider } from '@angular/core';

import { BillingAffiliatesApi } from './api/billing-affiliates.api';
import { BillingAffiliatesQuery } from './state/billing-affiliates.query';
import { BillingAffiliatesService } from './state/billing-affiliates.service';
import { BillingAffiliatesStore } from './state/billing-affiliates.store';

export const MANAGER_AFFILIATE_BILLING_AFFILIATES_PROVIDER: Provider[] = [
    BillingAffiliatesApi,
    BillingAffiliatesQuery,
    BillingAffiliatesService,
    BillingAffiliatesStore
];
