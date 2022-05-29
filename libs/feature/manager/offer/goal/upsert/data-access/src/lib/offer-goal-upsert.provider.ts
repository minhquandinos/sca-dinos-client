import { Provider } from '@angular/core';

import { OfferGoalCreateApi } from './api/offer-goal-create.api';
import { OfferGoalUpsertService } from './service/offer-goal-upsert.service';

export const OFFER_GOAL_UPSERT_PROVIDER: Provider[] = [OfferGoalCreateApi, OfferGoalUpsertService];
