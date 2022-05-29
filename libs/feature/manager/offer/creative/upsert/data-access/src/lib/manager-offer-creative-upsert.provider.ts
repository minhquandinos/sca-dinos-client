import { Provider } from '@angular/core';

import { OfferCreativeCreateApi } from './api/offer-creative-create.api';
import { OfferCreativeCreateService } from './service/offer-creative-create.service';

export const MANAGER_OFFER_CREATIVE_UPSERT_PROVIDER: Provider[] = [OfferCreativeCreateApi, OfferCreativeCreateService];
