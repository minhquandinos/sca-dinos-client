import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { PaymentMethodsStatesModel, PaymentMethodsStore } from './payment-methods.store';

@Injectable()
export class PaymentMethodsQuery extends QueryEntity<PaymentMethodsStatesModel> {
    public filters$ = this.select((state) => state.ui.filters);

    constructor(protected store: PaymentMethodsStore) {
        super(store);
    }
}
