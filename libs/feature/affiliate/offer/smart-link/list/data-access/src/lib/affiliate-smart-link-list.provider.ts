import { Provider } from '@angular/core';

import { AffiliateSmartLinkListApi } from './api/affiliate-smart-link-list.api';
import { AffiliateSmartLinkListQuery } from './state/affiliate-smart-link-list.query';
import { AffiliateSmartLinkListService } from './state/affiliate-smart-link-list.service';
import { AffiliateSmartLinkListStore } from './state/affiliate-smart-link-list.store';

export const AFFILIATE_SMART_LINK_LIST_PROVIDER: Provider[] = [
    AffiliateSmartLinkListApi,
    AffiliateSmartLinkListQuery,
    AffiliateSmartLinkListStore,
    AffiliateSmartLinkListService
];
