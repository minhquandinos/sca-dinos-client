import { Provider } from '@angular/core';

import { OfferLandingPageQuery } from './state/offer-landing-page.query';
import { OfferLandingPageService } from './state/offer-landing-page.service';
import { OfferLandingPageStore } from './state/offer-landing-page.store';

export const OFFER_LANDING_PAGE_PROVIDER: Provider[] = [OfferLandingPageQuery, OfferLandingPageService, OfferLandingPageStore];
