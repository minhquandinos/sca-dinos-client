import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ADVERTISER_ACCESS_PERSIST_STATE } from '@scaleo/feature/advertiser/core/persist-state';
import {
    AdvertiserReportConversionListModule,
    AdvertiserReportConversionsComponent
} from '@scaleo/feature/advertiser/reports/transactions/conversion/list/component';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';

@NgModule({
    imports: [
        CommonModule,
        AdvertiserReportConversionListModule.forRoot({ name: ADVERTISER_ACCESS_PERSIST_STATE.reportConversions }, [
            ReportFilterFilterEnum.Offer
        ]),
        RouterModule.forChild([
            {
                path: '',
                component: AdvertiserReportConversionsComponent
            }
        ])
    ]
})
export class FeatureAdvertiserReportsTransactionsConversionListPageModule {}
