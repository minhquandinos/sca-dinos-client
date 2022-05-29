import { Provider } from '@angular/core';

import { OfferDefaultLandingPageApi } from './offer-default-landing-page.api';
import { OfferDefaultLandingPageService } from './offer-default-landing-page.service';

export const OFFER_DEFAULT_LANDING_PAGE_PROVIDER: Provider[] = [OfferDefaultLandingPageApi, OfferDefaultLandingPageService];
