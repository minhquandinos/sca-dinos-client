import { Provider } from '@angular/core';

import { Billing2InvoiceUpdateApi } from './api/billing2-invoice-update.api';
import { Billing2InvoiceUpdateService } from './services/billing2-invoice-update.service';

export const MANAGER_INVOICE_EDIT_PROVIDER: Provider[] = [Billing2InvoiceUpdateApi, Billing2InvoiceUpdateService];
