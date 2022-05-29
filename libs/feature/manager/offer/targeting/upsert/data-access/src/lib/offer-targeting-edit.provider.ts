import { Provider } from '@angular/core';

import { OfferTargetingEditApi } from './api/offer-targeting-edit.api';
import { OfferTargetingEditService } from './services/offer-targeting-edit.service';

export const OFFER_TARGETING_EDIT_PROVIDER: Provider[] = [OfferTargetingEditApi, OfferTargetingEditService];
