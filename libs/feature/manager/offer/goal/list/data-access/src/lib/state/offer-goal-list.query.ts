import { Injectable } from '@angular/core';

import { BaseEntityQuery } from '@scaleo/core/state/entiy-state';

import { OfferConfigGoalsState, OfferGoalListStore } from './offer-goal-list.store';

@Injectable()
export class OfferGoalListQuery extends BaseEntityQuery<OfferConfigGoalsState> {
    constructor(protected store: OfferGoalListStore) {
        super(store);
    }
}
