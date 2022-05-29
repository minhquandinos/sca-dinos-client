import { Provider } from '@angular/core';

import { ManagerActivityLogListQuery } from './state/manager-activity-log-list.query';
import { ManagerActivityLogListService } from './state/manager-activity-log-list.service';
import { ManagerActivityLogListStore } from './state/manager-activity-log-list.store';

export const MANAGER_ACTIVITY_LOG_LIST_PROVIDER: Provider[] = [
    ManagerActivityLogListStore,
    ManagerActivityLogListService,
    ManagerActivityLogListQuery
];
