import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { TeammateListState, TeammateListStore } from './teammate-list.store';

@Injectable()
export class TeammateListQuery extends BaseEntityQuery<TeammateListState> {
    constructor(protected store: TeammateListStore) {
        super(store);
    }
}
