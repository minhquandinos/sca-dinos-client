import { Provider } from '@angular/core';

import { MANAGER_REFERRAL_PROVIDER } from '@scaleo/feature/manager/affiliate/referral/data-access';

import { ManagerAffiliateReferralWidgetQuery } from './state/manager-affiliate-referral-widget.query';
import { ManagerAffiliateReferralWidgetService } from './state/manager-affiliate-referral-widget.service';
import { ManagerAffiliateReferralWidgetStore } from './state/manager-affiliate-referral-widget.store';

export const MANAGER_AFFILIATE_REFERRAL_WIDGET: Provider[] = [
    ...MANAGER_REFERRAL_PROVIDER,
    ManagerAffiliateReferralWidgetStore,
    ManagerAffiliateReferralWidgetQuery,
    ManagerAffiliateReferralWidgetService
];
