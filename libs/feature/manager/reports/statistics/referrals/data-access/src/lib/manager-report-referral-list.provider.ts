import { Provider } from '@angular/core';

import { ManagerReportReferralListQuery } from './state/manager-report-referral-list.query';
import { ManagerReportReferralListService } from './state/manager-report-referral-list.service';
import { ManagerReportReferralListStore } from './state/manager-report-referral-list.store';

export const MANAGER_REPORT_REFERRAL_LIST_PROVIDER: Provider[] = [
    ManagerReportReferralListStore,
    ManagerReportReferralListService,
    ManagerReportReferralListQuery
];
