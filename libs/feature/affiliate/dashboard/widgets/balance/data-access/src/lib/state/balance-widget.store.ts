import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';

import { BaseStateStore, createBaseInitialState } from '@scaleo/core/state/state';

import { BalanceInvoicesWidgetModel } from '../models/balance-widget.model';

export type BalanceInvoicesWidgetState = BalanceInvoicesWidgetModel;

const initialState = createBaseInitialState<BalanceInvoicesWidgetState>({
    balance: undefined,
    'recent-invoices': []
});

@Injectable()
export class BalanceWidgetStore extends BaseStateStore<BalanceInvoicesWidgetState> {
    constructor() {
        super(initialState, { name: `dashboard-balance-${guid()}` });
    }
}
