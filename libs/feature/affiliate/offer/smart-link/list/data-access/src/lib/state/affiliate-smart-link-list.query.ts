import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { AffiliateSmartLinkListStore, AffiliateSmartLinksState } from './affiliate-smart-link-list.store';

@Injectable()
export class AffiliateSmartLinkListQuery extends BaseEntityQuery<AffiliateSmartLinksState> {
    constructor(protected store: AffiliateSmartLinkListStore) {
        super(store);
    }
}
