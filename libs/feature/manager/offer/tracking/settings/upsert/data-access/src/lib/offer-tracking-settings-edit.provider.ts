import { Provider } from '@angular/core';

import { OfferTrackingSettingsEditApi } from './api/offer-tracking-settings-edit.api';
import { OfferTrackingSettingsEditService } from './service/offer-tracking-settings-edit.service';

export const OFFER_TRACKING_SETTINGS_UPSERT_PROVIDER: Provider[] = [OfferTrackingSettingsEditApi, OfferTrackingSettingsEditService];
