import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseStateStore } from '@scaleo/core/state/state';
import { initialInvoiceDetailState, InvoiceDetailState } from '@scaleo/invoice/common';

@Injectable()
@StoreConfig({ name: 'affiliate-billing-invoice-detail' })
export class AffiliateBillingInvoiceDetailStore extends BaseStateStore<InvoiceDetailState> {
    constructor() {
        super(initialInvoiceDetailState);
    }
}
