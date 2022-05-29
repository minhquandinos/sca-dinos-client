import { Provider } from '@angular/core';

import { ReportConversionsQuery } from './state/report-conversions.query';
import { ReportConversionsService } from './state/report-conversions.service';
import { ReportConversionsStore } from './state/report-conversions.store';

export const REPORT_CONVERSIONS_PROVIDER: Provider[] = [ReportConversionsStore, ReportConversionsQuery, ReportConversionsService];
