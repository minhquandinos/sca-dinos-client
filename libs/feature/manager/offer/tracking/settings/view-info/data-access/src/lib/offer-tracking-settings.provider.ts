import { Provider } from '@angular/core';

import { OfferTrackingSettingsApi } from './api/offer-tracking-settings.api';
import { OfferTrackingSettingsService } from './service/offer-tracking-settings.service';
import { OfferTrackingSettingsQuery } from './state/offer-tracking-settings.query';
import { OfferTrackingSettingsStore } from './state/offer-tracking-settings.store';

export const OFFER_TRACKING_SETTINGS_PROVIDER: Provider[] = [
    OfferTrackingSettingsApi,
    OfferTrackingSettingsService,
    OfferTrackingSettingsQuery,
    OfferTrackingSettingsStore
];
