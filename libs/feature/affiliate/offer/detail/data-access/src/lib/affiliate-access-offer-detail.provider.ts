import { Provider } from '@angular/core';

import { AffiliateAccessOfferDetailApi } from './api/affiliate-access-offer-detail.api';
import { AffiliateAccessOfferDetailQuery } from './state/affiliate-access-offer-detail.query';
import { AffiliateAccessOfferDetailService } from './state/affiliate-access-offer-detail.service';
import { AffiliateAccessOfferDetailStore } from './state/affiliate-access-offer-detail.store';

export const AFFILIATE_ACCESS_OFFER_DETAIL_PROVIDER: Provider[] = [
    AffiliateAccessOfferDetailApi,
    AffiliateAccessOfferDetailQuery,
    AffiliateAccessOfferDetailService,
    AffiliateAccessOfferDetailStore
];
