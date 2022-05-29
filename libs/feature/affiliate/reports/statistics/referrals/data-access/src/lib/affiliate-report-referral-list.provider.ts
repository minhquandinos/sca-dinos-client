import { Provider } from '@angular/core';

import { AffiliateReportReferralListQuery } from './state/affiliate-report-referral-list.query';
import { AffiliateReportReferralListService } from './state/affiliate-report-referral-list.service';
import { AffiliateReportReferralListStore } from './state/affiliate-report-referral-list.store';

export const AFFILIATE_REPORT_REFERRAL_LIST_PROVIDER: Provider[] = [
    AffiliateReportReferralListStore,
    AffiliateReportReferralListService,
    AffiliateReportReferralListQuery
];
