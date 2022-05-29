import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ManagerReportReferralListComponent,
    ManagerReportReferralListModule
} from '@scaleo/feature/manager/reports/statistics/referrals/list';

@NgModule({
    imports: [
        CommonModule,
        ManagerReportReferralListModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManagerReportReferralListComponent
            }
        ])
    ]
})
export class ManagerReportsStatisticsReferralsPageModule {}
