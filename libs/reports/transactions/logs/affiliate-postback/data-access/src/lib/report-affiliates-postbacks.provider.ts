import { Provider } from '@angular/core';

import { ReportAffiliatesPostbacksApi } from './api/report-affiliates-postbacks.api';
import { ReportAffiliatesPostbacksQuery } from './state/report-affiliates-postbacks.query';
import { ReportAffiliatesPostbacksService } from './state/report-affiliates-postbacks.service';
import { ReportAffiliatesPostbacksStore } from './state/report-affiliates-postbacks.store';

export const REPORT_AFFILIATE_POSTBACK_LIST_PROVIDER: Provider[] = [
    ReportAffiliatesPostbacksApi,
    ReportAffiliatesPostbacksService,
    ReportAffiliatesPostbacksStore,
    ReportAffiliatesPostbacksQuery
];
