import { Provider } from '@angular/core';

import { Billing2InvoiceGenerateApi } from './api/billing2-invoice-generate.api';
import { Billing2InvoiceGenerateService } from './services/billing2-invoice-generate.service';

export const INVOICE_GENERATE_PROVIDER: Provider[] = [Billing2InvoiceGenerateService, Billing2InvoiceGenerateApi];
