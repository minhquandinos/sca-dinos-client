import { Provider } from '@angular/core';

import { ManagerAffiliatePostbackListQuery } from './manager-affiliate-postback-list.query';
import { ManagerAffiliatePostbackListService } from './manager-affiliate-postback-list.service';
import { ManagerAffiliatePostbackListStore } from './manager-affiliate-postback-list.store';

export const MANAGER_AFFILIATE_POSTBACK_LIST_PROVIDER: Provider[] = [
    ManagerAffiliatePostbackListStore,
    ManagerAffiliatePostbackListQuery,
    ManagerAffiliatePostbackListService
];
