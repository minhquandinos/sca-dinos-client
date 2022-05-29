import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';
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
        ReportAffiliatesPostbacksModule.forRoot({ name: ManagerStateNameEnum.ReportAffiliatesPostbacks }, [
            ReportFilterFilterEnum.Affiliate,
            ReportFilterFilterEnum.Offer
        ]),
        RouterModule.forChild(routes)
    ]
})
export class ManagerReportsTransactionsAffiliatePostbackPageModule {}
