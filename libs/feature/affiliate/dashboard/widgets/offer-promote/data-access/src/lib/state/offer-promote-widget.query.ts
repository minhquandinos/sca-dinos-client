import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { OfferPromoteWidgetState, OfferPromoteWidgetStore } from './offer-promote-widget.store';

@Injectable()
export class OfferPromoteWidgetQuery extends QueryEntity<OfferPromoteWidgetState> {
    constructor(protected store: OfferPromoteWidgetStore) {
        super(store);
    }
}
