import { Provider } from '@angular/core';

import { AffiliateActivityLogListQuery } from './state/affiliate-activity-log-list.query';
import { AffiliateActivityLogListService } from './state/affiliate-activity-log-list.service';
import { AffiliateActivityLogListStore } from './state/affiliate-activity-log-list.store';

export const AFFILIATE_ACTIVITY_LOG_LIST_PROVIDER: Provider[] = [
    AffiliateActivityLogListStore,
    AffiliateActivityLogListService,
    AffiliateActivityLogListQuery
];
