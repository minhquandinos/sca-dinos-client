import { Provider } from '@angular/core';

import { AdvertiserDetailService } from './advertiser-detail.service';
import { AdvertiserDetailQuery } from './state/advertiser-detail.query';
import { AdvertiserDetailStore } from './state/advertiser-detail.store';

export const ADVERTISER_DETAIL_STATE_PROVIDE: Provider[] = [AdvertiserDetailStore, AdvertiserDetailQuery, AdvertiserDetailService];
