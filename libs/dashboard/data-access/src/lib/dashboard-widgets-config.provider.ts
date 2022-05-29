import { Provider } from '@angular/core';

import { DashboardWidgetsConfigApi } from './api/dashboard-widgets-config.api';
import { DashboardWidgetsConfigQuery } from './state/dashboard-widgets-config.query';
import { DashboardWidgetsConfigService } from './state/dashboard-widgets-config.service';
import { DashboardWidgetsConfigStore } from './state/dashboard-widgets-config.store';

export const DASHBOARD_CONFIG_PROVIDER: Provider[] = [
    DashboardWidgetsConfigApi,
    DashboardWidgetsConfigService,
    DashboardWidgetsConfigStore,
    DashboardWidgetsConfigQuery
];
