import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ADVERTISER_ACCESS_PERSIST_STATE } from '@scaleo/feature/advertiser/core/persist-state';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportClicksComponent, ReportClicksModule } from '@scaleo/reports/transactions/click/list';

@NgModule({
    imports: [
        CommonModule,
        ReportClicksModule.forRoot(
            {
                name: ADVERTISER_ACCESS_PERSIST_STATE.reportClicks
            },
            [ReportFilterFilterEnum.Offer]
        ),
        RouterModule.forChild([
            {
                path: '',
                component: ReportClicksComponent
            }
        ])
    ]
})
export class AdvertiserReportsTransactionsClickPageModule {}
