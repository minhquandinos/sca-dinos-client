import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { DeliveriesStore, LeadsDeliveriesState } from './deliveries.store';

@Injectable()
export class DeliveriesQuery extends BaseEntityQuery<LeadsDeliveriesState> {
    constructor(protected override store: DeliveriesStore) {
        super(store);
    }
}
