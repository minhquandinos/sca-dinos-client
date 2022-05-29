import { Provider } from '@angular/core';

import { OfferCreativesWidgetQuery } from './state/offer-creatives-widget.query';
import { OfferCreativesWidgetService } from './state/offer-creatives-widget.service';
import { OfferCreativesWidgetStore } from './state/offer-creatives-widget.store';

export const OFFER_CREATIVES_WIDGET_PROVIDER: Provider[] = [
    OfferCreativesWidgetStore,
    OfferCreativesWidgetQuery,
    OfferCreativesWidgetService
];
