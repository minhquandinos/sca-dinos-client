import { Provider } from '@angular/core';

import { OfferLandingPageUpsertApi } from './api/offer-landing-page-upsert.api';
import { OfferLandingPageUpsertService } from './services/offer-landing-page-upsert.service';

export const OFFER_LANDING_PAGE_UPSERT_PROVIDER: Provider[] = [OfferLandingPageUpsertApi, OfferLandingPageUpsertService];
