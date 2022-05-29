import { Provider } from '@angular/core';

import { ManagerConversionsChangeStatusApi } from './manager-conversions-change-status.api';
import { ManagerConversionsChangeStatusService } from './manager-conversions-change-status.service';

export const MANAGER_CONVERSION_CHANGE_STATUS_PROVIDER: Provider[] = [
    ManagerConversionsChangeStatusApi,
    ManagerConversionsChangeStatusService
];
