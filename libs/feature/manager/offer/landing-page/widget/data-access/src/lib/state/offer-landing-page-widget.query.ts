import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { OfferLandingPageWidgetState, OfferLandingPageWidgetStore } from './offer-landing-page-widget.store';

@Injectable()
export class OfferLandingPageWidgetQuery extends BaseEntityQuery<OfferLandingPageWidgetState> {
    constructor(protected store: OfferLandingPageWidgetStore) {
        super(store);
    }
}
