import { Provider } from '@angular/core';

import { ReportAdvertiserPostbacksApi } from './api/report-advertiser-postbacks.api';
import { ReportAdvertiserPostbacksQuery } from './state/report-advertiser-postbacks.query';
import { ReportAdvertiserPostbacksService } from './state/report-advertiser-postbacks.service';
import { ReportAdvertiserPostbacksStore } from './state/report-advertiser-postbacks.store';

export const REPORT_ADVERTISER_POSTBACK_LIST_PROVIDER: Provider[] = [
    ReportAdvertiserPostbacksApi,
    ReportAdvertiserPostbacksService,
    ReportAdvertiserPostbacksStore,
    ReportAdvertiserPostbacksQuery
];
