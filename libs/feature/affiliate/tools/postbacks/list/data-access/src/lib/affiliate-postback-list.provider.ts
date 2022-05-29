import { Provider } from '@angular/core';

import { AffiliatePostbackListQuery } from './affiliate-postback-list.query';
import { AffiliatePostbackListService } from './affiliate-postback-list.service';
import { AffiliatePostbackListStore } from './affiliate-postback-list.store';

export const AFFILIATE_POSTBACK_LIST_PROVIDER: Provider[] = [
    AffiliatePostbackListStore,
    AffiliatePostbackListQuery,
    AffiliatePostbackListService
];
