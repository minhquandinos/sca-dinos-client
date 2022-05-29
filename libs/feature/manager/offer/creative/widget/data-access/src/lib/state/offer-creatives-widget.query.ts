import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { OfferCreativesWidgetState, OfferCreativesWidgetStore } from './offer-creatives-widget.store';

@Injectable()
export class OfferCreativesWidgetQuery extends BaseEntityQuery<OfferCreativesWidgetState> {
    constructor(protected readonly store: OfferCreativesWidgetStore) {
        super(store);
    }
}
