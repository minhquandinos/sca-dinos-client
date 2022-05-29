import { Provider } from '@angular/core';

import { OfferTrafficDistributionApi } from './api/offer-traffic-distribution.api';
import { AbTestingLandingsService } from './services/ab-testing-landings.service';
import { OfferTrafficDistributionQuery } from './state/offer-traffic-distribution.query';
import { OfferTrafficDistributionService } from './state/offer-traffic-distribution.service';
import { OfferTrafficDistributionStore } from './state/offer-traffic-distribution.store';
import { OfferTrafficDistributionAbTestingService } from './state/offer-traffic-distribution-ab-testing.service';

export const OFFER_TRAFFIC_DISTRIBUTION_PROVIDER: Provider[] = [
    OfferTrafficDistributionApi,
    AbTestingLandingsService,
    OfferTrafficDistributionQuery,
    OfferTrafficDistributionStore,
    OfferTrafficDistributionService,
    OfferTrafficDistributionAbTestingService
];
