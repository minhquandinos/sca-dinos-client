import { Provider } from '@angular/core';

import { OfferTargetingApi } from './api/offer-targeting.api';
import { OfferTargetingWidgetQuery } from './state/offer-targeting-widget.query';
import { OfferTargetingWidgetService } from './state/offer-targeting-widget.service';
import { OfferTargetingWidgetStore } from './state/offer-targeting-widget.store';

export const OFFER_TARGETING_WIDGET_PROVIDER: Provider[] = [
    OfferTargetingApi,
    OfferTargetingWidgetService,
    OfferTargetingWidgetStore,
    OfferTargetingWidgetQuery
];
