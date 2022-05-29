import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Filter2Interface } from '@scaleo/shared/services/filters';

import { PaymentMethodsModel } from '../models/payment-methods.model';

export interface PaymentMethodsStatesModel extends EntityState<PaymentMethodsModel> {
    ui: {
        filters: Filter2Interface;
    };
}

const initialState: PaymentMethodsStatesModel = {
    ui: {
        filters: {
            params: {
                sortField: 'sort',
                sortDirection: 'asc',
                page: 1,
                perPage: 50
            }
        }
    }
};

@Injectable()
@StoreConfig({
    name: 'payment-methods'
})
export class PaymentMethodsStore extends EntityStore<PaymentMethodsStatesModel> {
    constructor() {
        super(initialState);
    }
}
