import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { OfferTargetingWidgetState, OfferTargetingWidgetStore } from './offer-targeting-widget.store';

@Injectable()
export class OfferTargetingWidgetQuery extends Query<OfferTargetingWidgetState> {
    constructor(protected store: OfferTargetingWidgetStore) {
        super(store);
    }
}
