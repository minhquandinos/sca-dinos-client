import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AdvertiserActivityLogListStore, AdvertiserActivityLogState } from './advertiser-activity-log-list.store';

@Injectable()
export class AdvertiserActivityLogListQuery extends BaseEntityQuery<AdvertiserActivityLogState> {
    constructor(protected store: AdvertiserActivityLogListStore) {
        super(store);
    }
}
