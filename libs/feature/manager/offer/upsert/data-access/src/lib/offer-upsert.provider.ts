import { Provider } from '@angular/core';

import { OfferUpsertApi } from './api/offer-upsert.api';
import { OfferUpsertService } from './service/offer-upsert.service';

export const OFFER_UPSERT_PROVIDER: Provider[] = [OfferUpsertApi, OfferUpsertService];
