import { Provider } from '@angular/core';

import { ManagerDashboardPendingAdvertiserApi } from './manager-dashboard-pending-advertiser.api';
import { ManagerDashboardPendingAdvertiserQuery } from './manager-dashboard-pending-advertiser.query';
import { ManagerDashboardPendingAdvertiserService } from './manager-dashboard-pending-advertiser.service';
import { ManagerDashboardPendingAdvertiserStore } from './manager-dashboard-pending-advertiser.store';

export const MANAGER_DASHBOARD_PENDING_ADVERTISER_PROVIDER: Provider[] = [
    ManagerDashboardPendingAdvertiserApi,
    ManagerDashboardPendingAdvertiserStore,
    ManagerDashboardPendingAdvertiserQuery,
    ManagerDashboardPendingAdvertiserService
];
