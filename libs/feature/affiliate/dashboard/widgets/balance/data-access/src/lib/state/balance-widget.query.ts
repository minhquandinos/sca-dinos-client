import { Injectable } from '@angular/core';

import { BaseStateQuery } from '@scaleo/core/state/state';

import { BalanceInvoicesWidgetState, BalanceWidgetStore } from './balance-widget.store';

@Injectable()
export class BalanceWidgetQuery extends BaseStateQuery<BalanceInvoicesWidgetState> {
    constructor(protected store: BalanceWidgetStore) {
        super(store);
    }
}
