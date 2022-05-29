import { Provider } from '@angular/core';

import { AffiliateAccessReferralListApi } from './api/affiliate-access-referral-list.api';
import { AffiliateAccessReferralListQuery } from './state/affiliate-access-referral-list.query';
import { AffiliateAccessReferralListService } from './state/affiliate-access-referral-list.service';
import { AffiliateAccessReferralListStore } from './state/affiliate-access-referral-list.store';

export const AFFILIATE_ACCESS_LIST_PROVIDER: Provider[] = [
    AffiliateAccessReferralListApi,
    AffiliateAccessReferralListStore,
    AffiliateAccessReferralListService,
    AffiliateAccessReferralListQuery
];
