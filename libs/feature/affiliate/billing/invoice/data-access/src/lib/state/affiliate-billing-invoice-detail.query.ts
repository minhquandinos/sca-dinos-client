import { Injectable } from '@angular/core';

import { BaseStateQuery } from '@scaleo/core/state/state';
import { InvoiceDetailState } from '@scaleo/invoice/common';

import { AffiliateBillingInvoiceDetailStore } from './affiliate-billing-invoice-detail.store';

@Injectable()
export class AffiliateBillingInvoiceDetailQuery extends BaseStateQuery<InvoiceDetailState> {
    constructor(protected store: AffiliateBillingInvoiceDetailStore) {
        super(store);
    }
}
