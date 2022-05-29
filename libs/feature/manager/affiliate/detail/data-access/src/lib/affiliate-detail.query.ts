import { Injectable } from '@angular/core';

import { BaseStateQuery } from '@scaleo/core/state/state';

import { AffiliateDetailStore, AffiliateProfileState } from './affiliate-detail.store';

@Injectable({ providedIn: 'root' })
export class AffiliateDetailQuery extends BaseStateQuery<AffiliateProfileState> {
    constructor(protected store: AffiliateDetailStore) {
        super(store);
    }
}
