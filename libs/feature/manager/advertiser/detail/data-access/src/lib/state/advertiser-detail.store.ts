import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseStateStore } from '@scaleo/core/state/state';

export interface AdvertiserDetailState {
    id?: number;
    company_name?: string;
}

const createInitialState = (): AdvertiserDetailState => ({
    id: undefined,
    company_name: undefined
});

@Injectable()
@StoreConfig({ name: 'advertiser-detail' })
export class AdvertiserDetailStore extends BaseStateStore<AdvertiserDetailState> {
    constructor() {
        super(createInitialState());
    }
}
