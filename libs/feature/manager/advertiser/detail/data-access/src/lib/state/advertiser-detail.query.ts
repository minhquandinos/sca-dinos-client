import { Injectable } from '@angular/core';

import { BaseStateQuery } from '@scaleo/core/state/state';

import { AdvertiserDetailState, AdvertiserDetailStore } from './advertiser-detail.store';

@Injectable()
export class AdvertiserDetailQuery extends BaseStateQuery<AdvertiserDetailState> {
    constructor(protected store: AdvertiserDetailStore) {
        super(store);
    }
}
