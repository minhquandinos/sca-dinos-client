import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportInvalidClicksComponent, ReportInvalidClicksModule } from '@scaleo/reports/transactions/logs/invalid-click/list';

const routes: Routes = [
    {
        path: '',
        component: ReportInvalidClicksComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReportInvalidClicksModule.forRoot({ name: ManagerStateNameEnum.ReportInvalidClicks }, [
            ReportFilterFilterEnum.Affiliate,
            ReportFilterFilterEnum.Offer,
            ReportFilterFilterEnum.Advertiser
        ]),
        RouterModule.forChild(routes)
    ]
})
export class ManagerReportsTransactionsInvalidClickPageModule {}
