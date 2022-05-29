import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { OfferLandingPageState, OfferLandingPageStore } from './offer-landing-page.store';

@Injectable()
export class OfferLandingPageQuery extends BaseEntityQuery<OfferLandingPageState> {
    constructor(protected store: OfferLandingPageStore) {
        super(store);
    }
}
