import { Provider } from '@angular/core';

import { Billing2InvoiceDownloadPdfApi } from './api/billing2-invoice-download-pdf.api';
import { Billing2InvoiceDownloadPdfService } from './services/billing2-invoice-download-pdf.service';

export const INVOICE_DOWNLOAD_PDF_PROVIDER: Provider[] = [Billing2InvoiceDownloadPdfApi, Billing2InvoiceDownloadPdfService];
