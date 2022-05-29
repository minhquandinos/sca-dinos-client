import { Provider } from '@angular/core';

import { ManagerReportConversionUpsertApi } from './manager-report-conversion-upsert.api';
import { ManagerReportConversionUpsertService } from './manager-report-conversion-upsert.service';

export const MANAGER_REPORT_CONVERSION_UPSERT_PROVIDER: Provider[] = [
    ManagerReportConversionUpsertApi,
    ManagerReportConversionUpsertService
];
