import { Provider } from '@angular/core';

import { OfferAffiliateAccessApi } from './api/offer-affiliate-access.api';
import { OfferAffiliateAccessWidgetService } from './state/offer-affiliate-access-widget.service';
import { OfferAffiliateAccessWidgetQuery, OfferAffiliateAccessWidgetStore } from './state/offer-affiliate-access-widget.state';

export const OFFER_AFFILIATE_ACCESS_PROVIDER: Provider[] = [
    OfferAffiliateAccessApi,
    OfferAffiliateAccessWidgetService,
    OfferAffiliateAccessWidgetStore,
    OfferAffiliateAccessWidgetQuery
];
