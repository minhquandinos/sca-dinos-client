import { Provider } from '@angular/core';

import { AdvertiserActivityLogListQuery } from './state/advertiser-activity-log-list.query';
import { AdvertiserActivityLogListService } from './state/advertiser-activity-log-list.service';
import { AdvertiserActivityLogListStore } from './state/advertiser-activity-log-list.store';

export const ADVERTISER_ACTIVITY_LOG_LIST_PROVIDER: Provider[] = [
    AdvertiserActivityLogListStore,
    AdvertiserActivityLogListService,
    AdvertiserActivityLogListQuery
];
