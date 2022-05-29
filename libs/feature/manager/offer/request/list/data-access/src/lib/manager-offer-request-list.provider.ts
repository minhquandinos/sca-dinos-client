import { Provider } from '@angular/core';

import { OffersRequestsApi } from './api/offers-requests.api';
import { OffersRequestsQuery } from './state/offers-requests.query';
import { OffersRequestsService } from './state/offers-requests.service';
import { OffersRequestsStore } from './state/offers-requests.store';

export const MANAGER_OFFER_REQUEST_LIST_PROVIDER: Provider[] = [
    OffersRequestsApi,
    OffersRequestsQuery,
    OffersRequestsService,
    OffersRequestsStore
];
