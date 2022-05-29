import { Provider } from '@angular/core';

import { OfferConfigCreativesQuery } from './state/offer-config-creatives.query';
import { OfferConfigCreativesService } from './state/offer-config-creatives.service';
import { OfferConfigCreativesStore } from './state/offer-config-creatives.store';

export const MANAGER_OFFER_CREATIVE_LIST_PROVIDER: Provider[] = [
    OfferConfigCreativesQuery,
    OfferConfigCreativesStore,
    OfferConfigCreativesService
];
