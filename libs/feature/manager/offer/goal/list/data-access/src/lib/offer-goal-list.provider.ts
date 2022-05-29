import { Provider } from '@angular/core';

import { OfferGoalListQuery } from './state/offer-goal-list.query';
import { OfferGoalListService } from './state/offer-goal-list.service';
import { OfferGoalListStore } from './state/offer-goal-list.store';

export const OFFER_GOAL_LIST_PROVIDER: Provider[] = [OfferGoalListService, OfferGoalListStore, OfferGoalListQuery];
