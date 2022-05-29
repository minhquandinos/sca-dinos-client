import { Provider } from '@angular/core';

import { AffiliateOfferListApi } from './api/affiliate-offer-list.api';
import { AffiliateOfferListQuery } from './state/affiliate-offer-list.query';
import { AffiliateOfferListService } from './state/affiliate-offer-list.service';
import { AffiliateOfferListStore } from './state/affiliate-offer-list.store';

export const AFFILIATE_OFFER_LIST_PROVIDER: Provider[] = [
    AffiliateOfferListApi,
    AffiliateOfferListStore,
    AffiliateOfferListQuery,
    AffiliateOfferListService
];
