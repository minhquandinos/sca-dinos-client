import { Provider } from '@angular/core';

import { MANAGER_REFERRAL_PROVIDER } from '@scaleo/feature/manager/affiliate/referral/data-access';

import { ManagerReferralListQuery } from './state/manager-referral-list.query';
import { ManagerReferralListService } from './state/manager-referral-list.service';
import { ManagerReferralListStore } from './state/manager-referral-list.store';

export const MANAGER_REFERRAL_LIST_PROVIDER: Provider[] = [
    ...MANAGER_REFERRAL_PROVIDER,
    ManagerReferralListStore,
    ManagerReferralListService,
    ManagerReferralListQuery
];
