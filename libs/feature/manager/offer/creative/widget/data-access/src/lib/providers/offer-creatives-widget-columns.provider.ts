import { Provider } from '@angular/core';

import { offerCreativesWidgetColumnsConfig } from '../config/offer-creatives-widget-columns.config';
import { OFFER_CREATIVES_WIDGET_COLUMNS } from '../tokens/offer-creatives-widget-columns.token';

export const OFFER_CREATIVES_WIDGET_COLUMNS_PROVIDER: Provider = {
    provide: OFFER_CREATIVES_WIDGET_COLUMNS,
    useValue: offerCreativesWidgetColumnsConfig
};
