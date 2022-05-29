import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseStateQuery } from '@scaleo/core/state/state';

import { AffiliateInvoicesWidgetModel } from '../models/affiliate-invoices-widget.model';
import { AffiliateInvoicesWidgetState, ManagerInvoicesWidgetStore } from './manager-invoices-widget.store';

@Injectable()
export class ManagerInvoicesWidgetQuery extends BaseStateQuery<AffiliateInvoicesWidgetState> {
    invoices$: Observable<AffiliateInvoicesWidgetModel[]> = this.select('invoices');

    total$: Observable<number> = this.select('total');

    loading$ = this.selectLoading();

    notFound$ = this.total$.pipe(map((total) => total <= 0));

    constructor(protected store: ManagerInvoicesWidgetStore) {
        super(store);
    }
}
