import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AFFILIATE_ACCESS_PERSIST_STATE } from '@scaleo/feature/affiliate/core/persist-state';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportInvalidClicksComponent, ReportInvalidClicksModule } from '@scaleo/reports/transactions/logs/invalid-click/list';

@NgModule({
    imports: [
        CommonModule,
        ReportInvalidClicksModule.forRoot(
            {
                name: AFFILIATE_ACCESS_PERSIST_STATE.reportInvalidClicks
            },
            [ReportFilterFilterEnum.Offer]
        ),
        RouterModule.forChild([
            {
                path: '',
                component: ReportInvalidClicksComponent
            }
        ])
    ]
})
export class AffiliateReportsTransactionsInvalidClickPageModule {}
