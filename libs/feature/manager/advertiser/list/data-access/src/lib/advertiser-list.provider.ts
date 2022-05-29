import { Provider } from '@angular/core';

import { AdvertiserListApi } from './api/advertiser-list.api';
import { AdvertiserListQuery } from './state/advertiser-list.query';
import { AdvertiserListService } from './state/advertiser-list.service';
import { AdvertiserListStore } from './state/advertiser-list.store';

export const ADVERTISER_LIST_PROVIDER: Provider[] = [AdvertiserListQuery, AdvertiserListApi, AdvertiserListService, AdvertiserListStore];
