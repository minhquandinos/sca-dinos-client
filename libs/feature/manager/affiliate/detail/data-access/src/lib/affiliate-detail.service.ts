import { Injectable } from '@angular/core';

import { BaseStateService } from '@scaleo/core/state/state';

import { AffiliateDetailQuery } from './affiliate-detail.query';
import { AffiliateDetailStore, AffiliateProfileState } from './affiliate-detail.store';

// TODO remove this service after backend return correct response
@Injectable({ providedIn: 'root' })
export class AffiliateDetailService extends BaseStateService<AffiliateProfileState> {
    constructor(protected readonly store: AffiliateDetailStore, protected readonly query: AffiliateDetailQuery) {
        super(store, query);
    }

    updateStore(obj: Partial<AffiliateProfileState>): void {
        this.store.update({
            ...obj
        });
    }

    resetStore(): void {
        this.store.reset();
    }
}
