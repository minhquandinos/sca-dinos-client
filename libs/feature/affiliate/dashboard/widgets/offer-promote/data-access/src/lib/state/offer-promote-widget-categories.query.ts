import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { OfferPromoteWidgetCategoriesState, OfferPromoteWidgetCategoriesStore } from './offer-promote-widget-categories.store';

@Injectable()
export class OfferPromoteWidgetCategoriesQuery extends QueryEntity<OfferPromoteWidgetCategoriesState> {
    constructor(protected store: OfferPromoteWidgetCategoriesStore) {
        super(store);
    }
}
