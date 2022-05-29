import { Provider } from '@angular/core';

import { ReportAdjustmentsApi } from './report-adjustments.api';
import { ReportAdjustmentListQuery } from './state/report-adjustment-list.query';
import { ReportAdjustmentListService } from './state/report-adjustment-list.service';
import { ReportAdjustmentListStore } from './state/report-adjustment-list.store';

export const REPORT_ADJUSTMENT_LIST_PROVIDER: Provider[] = [
    ReportAdjustmentsApi,
    ReportAdjustmentListStore,
    ReportAdjustmentListService,
    ReportAdjustmentListQuery
];
