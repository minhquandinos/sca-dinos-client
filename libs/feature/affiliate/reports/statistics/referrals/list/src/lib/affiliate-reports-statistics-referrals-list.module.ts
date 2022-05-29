import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ReportReferralListModule } from '@scaleo/reports/referrals/list';

import { AffiliateReportReferralListComponent } from './affiliate-report-referral-list.component';

@NgModule({
    declarations: [AffiliateReportReferralListComponent],
    imports: [CommonModule, SharedModule, ReportReferralListModule, PlatformFormatPipeModule]
})
export class AffiliateReportsStatisticsReferralsListModule {}
