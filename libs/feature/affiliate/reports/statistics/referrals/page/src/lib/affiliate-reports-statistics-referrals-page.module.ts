import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    AffiliateReportReferralListComponent,
    AffiliateReportsStatisticsReferralsListModule
} from '@scaleo/feature/affiliate/reports/statistics/referrals/list';

@NgModule({
    imports: [
        CommonModule,
        AffiliateReportsStatisticsReferralsListModule,
        RouterModule.forChild([
            {
                path: '',
                component: AffiliateReportReferralListComponent
            }
        ])
    ]
})
export class AffiliateReportsStatisticsReferralsPageModule {}
