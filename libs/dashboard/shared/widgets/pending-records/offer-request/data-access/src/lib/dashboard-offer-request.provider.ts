import { Provider } from '@angular/core';

import { DashboardOfferRequestApi } from './dashboard-offer-request.api';
import { DashboardOfferRequestQuery } from './dashboard-offer-request.query';
import { DashboardOfferRequestService } from './dashboard-offer-request.service';
import { DashboardOfferRequestStore } from './dashboard-offer-request.store';

export const DASHBOARD_OFFER_REQUEST_PROVIDER: Provider[] = [
    DashboardOfferRequestStore,
    DashboardOfferRequestQuery,
    DashboardOfferRequestService,
    DashboardOfferRequestApi
];
