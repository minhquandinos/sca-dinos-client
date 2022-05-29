import { Provider } from '@angular/core';

import { OfferCustomParamsWidgetQuery } from './state/offer-custom-params-widget.query';
import { OfferCustomParamsWidgetService } from './state/offer-custom-params-widget.service';
import { OfferCustomParamsWidgetStore } from './state/offer-custom-params-widget.store';

export const OFFER_CUSTOM_PARAMETER_WIDGET_PROVIDER: Provider[] = [
    OfferCustomParamsWidgetService,
    OfferCustomParamsWidgetStore,
    OfferCustomParamsWidgetQuery
];
