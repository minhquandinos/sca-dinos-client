import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { DomainListState, DomainListStore } from './domain-list.store';

@Injectable()
export class DomainListQuery extends BaseEntityQuery<DomainListState> {
    constructor(protected store: DomainListStore) {
        super(store);
    }
}
