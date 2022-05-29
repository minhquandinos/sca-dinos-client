import { Provider } from '@angular/core';

import { AffiliateDashboardPendingRecordsCountApi } from './affiliate-dashboard-pending-records-count.api';
import { AffiliateDashboardPendingRecordsCountService } from './affiliate-dashboard-pending-records-count.service';

export const AFFILIATE_PENDING_RECORDS_COUNT_PROVIDER: Provider[] = [
    AffiliateDashboardPendingRecordsCountApi,
    AffiliateDashboardPendingRecordsCountService
];
