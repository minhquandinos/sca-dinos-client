import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { ManagerSmartLinkListStore, ManagerSmartLinksState } from './manager-smart-link-list.store';

@Injectable()
export class ManagerSmartLinkListQuery extends BaseEntityQuery<ManagerSmartLinksState> {
    constructor(protected store: ManagerSmartLinkListStore) {
        super(store);
    }
}
