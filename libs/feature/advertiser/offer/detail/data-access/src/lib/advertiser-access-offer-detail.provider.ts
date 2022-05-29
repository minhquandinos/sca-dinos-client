import { Provider } from '@angular/core';

import { AdvertiserAccessOfferDetailApi } from './api/advertiser-access-offer-detail.api';
import { AdvertiserAccessOfferDetailQuery } from './state/advertiser-access-offer-detail.query';
import { AdvertiserAccessOfferDetailService } from './state/advertiser-access-offer-detail.service';
import { AdvertiserAccessOfferDetailStore } from './state/advertiser-access-offer-detail.store';

export const ADVERTISER_ACCESS_OFFER_DETAIL_PROVIDER: Provider[] = [
    AdvertiserAccessOfferDetailApi,
    AdvertiserAccessOfferDetailQuery,
    AdvertiserAccessOfferDetailService,
    AdvertiserAccessOfferDetailStore
];
