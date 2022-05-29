import { Provider } from '@angular/core';

import { Billing2InvoicesApi } from './api/billing2-invoices.api';
import { Billing2InvoicesService } from './services/billing2-invoices.service';
import { Billing2InvoicesFiltersService } from './services/billing2-invoices-filters.service';
import { Billing2InvoicesQuery } from './state/billing2-invoices.query';
import { Billing2InvoicesStore } from './state/billing2-invoices.store';

export const MANAGER_BILLING_INVOICES_DATA_ACCESS_PROVIDER: Provider[] = [
    Billing2InvoicesApi,
    Billing2InvoicesService,
    Billing2InvoicesQuery,
    Billing2InvoicesStore,
    Billing2InvoicesFiltersService
];
