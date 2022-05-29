import { Provider } from '@angular/core';

import { Billing2InvoiceDetailApi } from './api/billing2-invoice-detail.api';
import { Billing2InvoiceDetailService } from './services/billing2-invoice-detail.service';
import { ManagerInvoiceDetailQuery } from './state/manager-invoice-detail.query';
import { ManagerInvoiceDetailStore } from './state/manager-invoice-detail.store';

export const MANAGER_INVOICE_DETAIL_PROVIDER: Provider[] = [
    Billing2InvoiceDetailApi,
    Billing2InvoiceDetailService,
    ManagerInvoiceDetailQuery,
    ManagerInvoiceDetailStore
];
