import { Injectable } from '@angular/core';
import { EntityState, EntityStore, guid, StoreConfig } from '@datorama/akita';

import { OfferPromoteWidgetCategoriesModel } from '../models/offer-promote-widget.model';

export type OfferPromoteWidgetCategoriesState = EntityState<OfferPromoteWidgetCategoriesModel>;

@Injectable()
@StoreConfig({ name: `dashboard-offer-promote-categories-${guid()}`, idKey: 'category_id' })
export class OfferPromoteWidgetCategoriesStore extends EntityStore<OfferPromoteWidgetCategoriesState> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
        super();
    }
}
