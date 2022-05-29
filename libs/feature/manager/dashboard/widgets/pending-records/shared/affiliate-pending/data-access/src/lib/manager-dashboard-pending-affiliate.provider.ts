import { Provider } from '@angular/core';

import { ManagerDashboardPendingAffiliateApi } from './manager-dashboard-pending-affiliate.api';
import { ManagerDashboardPendingAffiliateQuery } from './manager-dashboard-pending-affiliate.query';
import { ManagerDashboardPendingAffiliateService } from './manager-dashboard-pending-affiliate.service';
import { ManagerDashboardPendingAffiliateStore } from './manager-dashboard-pending-affiliate.store';

export const MANAGER_DASHBOARD_PENDING_AFFILIATE_PROVIDER: Provider[] = [
    ManagerDashboardPendingAffiliateApi,
    ManagerDashboardPendingAffiliateStore,
    ManagerDashboardPendingAffiliateQuery,
    ManagerDashboardPendingAffiliateService
];
