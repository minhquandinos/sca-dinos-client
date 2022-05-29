import { Provider } from '@angular/core';

import { OfferLandingPageWidgetQuery } from './state/offer-landing-page-widget.query';
import { OfferLandingPageWidgetService } from './state/offer-landing-page-widget.service';
import { OfferLandingPageWidgetStore } from './state/offer-landing-page-widget.store';

export const OFFER_LANDING_PAGE_WIDGET_PROVIDER: Provider[] = [
    OfferLandingPageWidgetQuery,
    OfferLandingPageWidgetService,
    OfferLandingPageWidgetStore
];
