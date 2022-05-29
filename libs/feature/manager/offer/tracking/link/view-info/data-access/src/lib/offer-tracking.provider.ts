import { Provider } from '@angular/core';

import { OfferTrackingApi } from './offer-tracking.api';
import { OfferTrackingService } from './offer-tracking.service';

export const OFFER_TRACKING_PROVIDER: Provider[] = [OfferTrackingApi, OfferTrackingService];
