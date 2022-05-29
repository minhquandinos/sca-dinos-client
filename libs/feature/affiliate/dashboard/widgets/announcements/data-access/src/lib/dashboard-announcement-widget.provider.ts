import { Provider } from '@angular/core';

import { DashboardAnnouncementWidgetListApi } from './api/dashboard-announcement-widget-list.api';
import { DashboardAnnouncementWidgetListService } from './dashboard-announcement-widget-list.service';
import { DashboardAnnouncementWidgetMenuService } from './dashboard-announcement-widget-menu.service';

export const AFFILIATE_DASHBOARD_ANNOUNCEMENT_PROVIDER: Provider[] = [
    DashboardAnnouncementWidgetListApi,
    DashboardAnnouncementWidgetListService,
    DashboardAnnouncementWidgetMenuService
];
