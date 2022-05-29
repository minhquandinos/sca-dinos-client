import { Provider } from '@angular/core';

import { AdvertiserOfferListApi } from './api/advertiser-offer-list.api';
import { AdvertiserOfferListQuery } from './state/advertiser-offer-list.query';
import { AdvertiserOfferListService } from './state/advertiser-offer-list.service';
import { AdvertiserOfferListStore } from './state/advertiser-offer-list.store';

export const ADVERTISER_OFFER_LIST_PROVIDER: Provider[] = [
    AdvertiserOfferListApi,
    AdvertiserOfferListStore,
    AdvertiserOfferListQuery,
    AdvertiserOfferListService
];
