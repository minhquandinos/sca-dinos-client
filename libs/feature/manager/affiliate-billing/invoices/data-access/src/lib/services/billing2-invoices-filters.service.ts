import { Injectable } from '@angular/core';

import { BaseEntityService } from '@scaleo/core/state/entiy-state';

import { Billing2InvoicesQuery } from '../state/billing2-invoices.query';
import { Billing2InvoicesState, Billing2InvoicesStore } from '../state/billing2-invoices.store';

@Injectable()
export class Billing2InvoicesFiltersService extends BaseEntityService<Billing2InvoicesState> {
    constructor(protected store: Billing2InvoicesStore, protected query: Billing2InvoicesQuery) {
        super(store, query);
    }
}
