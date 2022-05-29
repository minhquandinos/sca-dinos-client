import { Provider } from '@angular/core';

import { OfferCustomParamListQuery } from './state/offer-custom-param-list.query';
import { OfferCustomParamListService } from './state/offer-custom-param-list.service';
import { OfferCustomParamListStore } from './state/offer-custom-param-list.store';

export const OFFER_CUSTOM_PARAMETER_LIST_PROVIDER: Provider[] = [
    OfferCustomParamListStore,
    OfferCustomParamListService,
    OfferCustomParamListQuery
];
