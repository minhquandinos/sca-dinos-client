import { Provider } from '@angular/core';

import { DashboardAffiliatePostbackApi } from './dashboard-affiliate-postback.api';
import { DashboardAffiliatePostbackQuery } from './dashboard-affiliate-postback.query';
import { DashboardAffiliatePostbackService } from './dashboard-affiliate-postback.service';
import { DashboardAffiliatePostbackStore } from './dashboard-affiliate-postback.store';

export const DASHBOARD_AFFILIATE_POSTBACK_PROVIDER: Provider[] = [
    DashboardAffiliatePostbackStore,
    DashboardAffiliatePostbackQuery,
    DashboardAffiliatePostbackService,
    DashboardAffiliatePostbackApi
];
