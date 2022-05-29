import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';

import { BaseStateStore } from '@scaleo/core/state/state';

import { AffiliateCountsModel } from './affiliate-counts.model';

export interface AffiliateProfileState {
    id: number;
    company: string;
    counts: AffiliateCountsModel;
}

export function createInitialState(): AffiliateProfileState {
    return {
        id: undefined,
        company: undefined,
        counts: undefined
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'affiliate-profile', resettable: true })
export class AffiliateDetailStore extends BaseStateStore<AffiliateProfileState> {
    constructor() {
        super(createInitialState());
    }
}
