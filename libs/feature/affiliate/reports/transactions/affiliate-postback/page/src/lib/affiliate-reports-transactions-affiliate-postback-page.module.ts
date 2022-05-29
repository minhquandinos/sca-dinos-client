import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AFFILIATE_ACCESS_PERSIST_STATE } from '@scaleo/feature/affiliate/core/persist-state';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import {
    ReportAffiliatesPostbacksComponent,
    ReportAffiliatesPostbacksModule
} from '@scaleo/reports/transactions/logs/affiliate-postback/list';

const routes: Routes = [
    {
        path: '',
        component: ReportAffiliatesPostbacksComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReportAffiliatesPostbacksModule.forRoot({ name: AFFILIATE_ACCESS_PERSIST_STATE.reportAffiliatesPostbacks }, [
            ReportFilterFilterEnum.Offer
        ]),
        RouterModule.forChild(routes)
    ]
})
export class AffiliateReportsTransactionsAffiliatePostbackPageModule {}
