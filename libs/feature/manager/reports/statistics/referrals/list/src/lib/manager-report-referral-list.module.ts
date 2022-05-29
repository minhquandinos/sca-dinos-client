import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { ReportReferralListModule } from '@scaleo/reports/referrals/list';
import { HyperlinkModule, NavigateRootModule } from '@scaleo/shared/components';
import { PregMatchPipeModule } from '@scaleo/shared/pipes';

import { ManagerReferralFilterModule } from './components/report-filter/manager-referral-filter.module';
import { ManagerReportReferralListComponent } from './manager-report-referral-list.component';

@NgModule({
    declarations: [ManagerReportReferralListComponent],
    imports: [
        CommonModule,
        ReportReferralListModule,
        ManagerReferralFilterModule,
        PlatformFormatPipeModule,
        HyperlinkModule,
        PregMatchPipeModule,
        SharedModule,
        NavigateRootModule
    ],
    exports: [ManagerReportReferralListComponent]
})
export class ManagerReportReferralListModule {}
