import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ManagerActivityLogListStore, ManagerActivityLogState } from './manager-activity-log-list.store';

@Injectable()
export class ManagerActivityLogListQuery extends BaseEntityQuery<ManagerActivityLogState> {
    constructor(protected store: ManagerActivityLogListStore) {
        super(store);
    }
}
