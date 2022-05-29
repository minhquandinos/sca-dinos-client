import { Provider } from '@angular/core';

import { BillingInvoicesFrequenciesFormControlsModel } from '../models/billing-invoices-frequencies-form-control.model';
import { BILLING_INVOICE_FREQUENCIES_FORM_CONTROL_TOKEN } from '../tokens/billing-invoice-frequencies-form-control.token';

export function BillingInvoiceFrequenciesFormControlProvider(fomControls: BillingInvoicesFrequenciesFormControlsModel): Provider {
    return {
        provide: BILLING_INVOICE_FREQUENCIES_FORM_CONTROL_TOKEN,
        useValue: fomControls
    };
}
