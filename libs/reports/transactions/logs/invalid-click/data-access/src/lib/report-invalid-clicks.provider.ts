import { Provider } from '@angular/core';

import { ReportInvalidClicksApi } from './api/report-invalid-clicks.api';
import { ReportInvalidClicksQuery } from './state/report-invalid-clicks.query';
import { ReportInvalidClicksService } from './state/report-invalid-clicks.service';
import { ReportInvalidClicksStore } from './state/report-invalid-clicks.store';

export const REPORT_INVALID_CLICK_LIST_PROVIDER: Provider[] = [
    ReportInvalidClicksApi,
    ReportInvalidClicksStore,
    ReportInvalidClicksService,
    ReportInvalidClicksQuery
];
