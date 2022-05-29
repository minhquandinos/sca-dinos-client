import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';
import { ReportClicksComponent, ReportClicksModule } from '@scaleo/reports/transactions/click/list';

@NgModule({
    imports: [
        CommonModule,
        ReportClicksModule.forRoot({ name: ManagerStateNameEnum.ReportClicks }, [
            ReportFilterFilterEnum.Affiliate,
            ReportFilterFilterEnum.Offer,
            ReportFilterFilterEnum.Advertiser
        ]),
        RouterModule.forChild([
            {
                path: '',
                component: ReportClicksComponent
            }
        ])
    ]
})
export class ManagerTransactionsReportClickPageModule {}
