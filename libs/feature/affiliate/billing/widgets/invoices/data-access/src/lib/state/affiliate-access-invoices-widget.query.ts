import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';
import { InvoicesQueryInterface, InvoicesRequestModel } from '@scaleo/invoice/common';
import { objectUtil } from '@scaleo/utils';

import { AffiliateAccessInvoicesState, AffiliateAccessInvoicesWidgetStore } from './affiliate-access-invoices-widget.store';

@Injectable({ providedIn: 'root' })
export class AffiliateAccessInvoicesWidgetQuery extends BaseEntityQuery<AffiliateAccessInvoicesState> implements InvoicesQueryInterface {
    constructor(protected store: AffiliateAccessInvoicesWidgetStore) {
        super(store);
    }

    get columns$() {
        return this.selectParamsValue$('columns').pipe(
            map((columns) =>
                columns?.split(',').map((column) => ({
                    value: column,
                    translate: `table.column.${column}`
                }))
            )
        );
    }

    get updated$(): Observable<InvoicesRequestModel> {
        return objectUtil.mutationKeyWhenValuesChanges(this.selectParams$(), 'page', 1).pipe(
            debounceTime(200),
            filter(({ columns }) => !!columns),
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
            map((params) => params as InvoicesRequestModel)
        );
    }
}
