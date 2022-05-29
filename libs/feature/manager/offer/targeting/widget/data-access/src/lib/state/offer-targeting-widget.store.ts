import { Injectable } from '@angular/core';
import { guid, Store } from '@datorama/akita';

import { BooleanEnum } from '@scaleo/core/data';
import { OfferTargetingModel } from '@scaleo/offer/common';

export type OfferTargetingWidgetState = OfferTargetingModel;

const initialState = (): OfferTargetingWidgetState => ({
    gt_included_ids: [],
    gt_excluded_ids: [],
    extended_targeting: [],
    strict_targeting: BooleanEnum.True
});

@Injectable()
export class OfferTargetingWidgetStore extends Store<OfferTargetingWidgetState> {
    constructor() {
        super(initialState(), { name: `OfferTargetingWidget-${guid()}` });
    }
}
