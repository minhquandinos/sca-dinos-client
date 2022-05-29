import { Provider } from '@angular/core';

import { OfferInfoWidgetApi } from './offer-info-widget.api';
import { OfferInfoWidgetQuery } from './state/offer-info-widget.query';
import { OfferInfoWidgetService } from './state/offer-info-widget.service';
import { OfferInfoWidgetStore } from './state/offer-info-widget.store';

export const OFFER_INFO_WIDGET_PROVIDER: Provider[] = [
    OfferInfoWidgetQuery,
    OfferInfoWidgetApi,
    OfferInfoWidgetService,
    OfferInfoWidgetStore
];
