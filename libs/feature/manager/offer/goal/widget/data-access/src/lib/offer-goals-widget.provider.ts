import { Provider } from '@angular/core';

import { OfferGoalsWidgetQuery } from './state/offer-goals-widget.query';
import { OfferGoalsWidgetService } from './state/offer-goals-widget.service';
import { OfferGoalsWidgetStore } from './state/offer-goals-widget.store';

export const OFFER_GOAL_WIDGET_PROVIDER: Provider[] = [OfferGoalsWidgetService, OfferGoalsWidgetQuery, OfferGoalsWidgetStore];
