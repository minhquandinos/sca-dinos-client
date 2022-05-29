import { Injectable } from '@angular/core';
import { guid, StoreConfig } from '@datorama/akita';

import { BaseStateStore, createBaseInitialState } from '@scaleo/core/state/state';

import { AffiliateInvoicesWidgetModel } from '../models/affiliate-invoices-widget.model';

export interface AffiliateInvoicesWidgetState {
    invoices: AffiliateInvoicesWidgetModel[];
    total: number;
}

const createInitialState = createBaseInitialState<AffiliateInvoicesWidgetState>({
    invoices: [],
    total: 0
});

@Injectable()
@StoreConfig({ name: `manager-invoices-widget-${guid()}`, resettable: true })
export class ManagerInvoicesWidgetStore extends BaseStateStore<AffiliateInvoicesWidgetState> {
    constructor() {
        super(createInitialState);
    }
}
