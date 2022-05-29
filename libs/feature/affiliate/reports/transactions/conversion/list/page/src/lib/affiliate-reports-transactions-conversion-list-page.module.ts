import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AFFILIATE_ACCESS_PERSIST_STATE } from '@scaleo/feature/affiliate/core/persist-state';
import {
    AffiliateReportConversionListModule,
    AffiliateReportConversionsComponent
} from '@scaleo/feature/affiliate/reports/transactions/conversion/list/component';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';

@NgModule({
    imports: [
        CommonModule,
        AffiliateReportConversionListModule.forRoot({ name: AFFILIATE_ACCESS_PERSIST_STATE.reportConversions }, [
            ReportFilterFilterEnum.Offer
        ]),
        RouterModule.forChild([
            {
                path: '',
                component: AffiliateReportConversionsComponent
            }
        ])
    ]
})
export class AffiliateReportsTransactionsConversionListPageModule {}
