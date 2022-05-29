import { Provider } from '@angular/core';

import { OfferPromoteWidgetApi } from './api/offer-promote-widget.api';
import { OfferPromoteWidgetQuery } from './state/offer-promote-widget.query';
import { OfferPromoteWidgetService } from './state/offer-promote-widget.service';
import { OfferPromoteWidgetStore } from './state/offer-promote-widget.store';
import { OfferPromoteWidgetCategoriesQuery } from './state/offer-promote-widget-categories.query';
import { OfferPromoteWidgetCategoriesStore } from './state/offer-promote-widget-categories.store';

export const OFFER_PROMOTE_WIDGET_PROVIDER: Provider[] = [
    OfferPromoteWidgetApi,
    OfferPromoteWidgetStore,
    OfferPromoteWidgetCategoriesStore,
    OfferPromoteWidgetCategoriesQuery,
    OfferPromoteWidgetQuery,
    OfferPromoteWidgetService
];
