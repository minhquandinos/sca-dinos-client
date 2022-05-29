import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseStateStore } from '@scaleo/core/state/state';
import { initialInvoiceDetailState, InvoiceDetailState } from '@scaleo/invoice/common';

@Injectable()
@StoreConfig({ name: 'manager-invoice-detail' })
export class ManagerInvoiceDetailStore extends BaseStateStore<InvoiceDetailState> {
    constructor() {
        super(initialInvoiceDetailState);
    }
}
