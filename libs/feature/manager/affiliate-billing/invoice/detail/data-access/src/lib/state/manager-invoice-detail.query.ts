import { Injectable } from '@angular/core';

import { BaseStateQuery } from '@scaleo/core/state/state';
import { InvoiceDetailState } from '@scaleo/invoice/common';

import { ManagerInvoiceDetailStore } from './manager-invoice-detail.store';

@Injectable()
export class ManagerInvoiceDetailQuery extends BaseStateQuery<InvoiceDetailState> {
    constructor(protected store: ManagerInvoiceDetailStore) {
        super(store);
    }
}
