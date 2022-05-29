import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import {
    ReportAdvertiserPostbacksComponent,
    ReportAdvertiserPostbacksModule
} from '@scaleo/reports/transactions/logs/advertiser-postback/list';

const routes: Routes = [
    {
        path: '',
        component: ReportAdvertiserPostbacksComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReportAdvertiserPostbacksModule.forRoot({ name: ManagerStateNameEnum.ReportAdvertiserPostbacks }, [
            ReportFilterFilterEnum.Affiliate,
            ReportFilterFilterEnum.Offer
        ]),
        RouterModule.forChild(routes)
    ]
})
export class ManagerReportsTransactionsAdvertiserPostbackPageModule {}
