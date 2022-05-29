import { Injectable } from '@angular/core';
import { EntityState, StoreConfig } from '@datorama/akita';

import { SortByType } from '@scaleo/core/data';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { BaseEntityStore, createEntityInitialState } from '@scaleo/core/state/entiy-state';
import { InvoicesModel } from '@scaleo/invoice/common';

export interface AffiliateAccessInvoicesState extends EntityState<InvoicesModel> {
    data?: {
        pagination: ApiPaginationModel;
    };
    params?: {
        columns: string;
        page: number;
        perPage: number;
        sortField: string;
        sortDirection: SortByType;
    };
}

export const initialBilling2InvoicesState = createEntityInitialState<AffiliateAccessInvoicesState>({
    data: {
        pagination: null
    },
    params: {
        columns: '',
        page: 1,
        perPage: 25,
        sortField: 'invoice_number',
        sortDirection: 'desc'
    }
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'affiliate-invoices-list', resettable: true })
export class AffiliateAccessInvoicesWidgetStore extends BaseEntityStore<AffiliateAccessInvoicesState> {
    constructor() {
        super(initialBilling2InvoicesState);
    }
}
