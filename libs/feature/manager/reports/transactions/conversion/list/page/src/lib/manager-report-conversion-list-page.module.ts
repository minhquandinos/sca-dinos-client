import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerStateNameEnum } from '@scaleo/feature/manager/core/persist-state';
import {
    ManagerReportConversionListModule,
    ManagerReportConversionsComponent
} from '@scaleo/feature/manager/reports/transactions/conversion/list/component';
import { ReportFilterFilterEnum } from '@scaleo/reports/shared/filters/common';

const routes: Routes = [
    {
        path: '',
        component: ManagerReportConversionsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        ManagerReportConversionListModule.forRoot({ name: ManagerStateNameEnum.ReportConversions }, [
            ReportFilterFilterEnum.Affiliate,
            ReportFilterFilterEnum.Offer,
            ReportFilterFilterEnum.Advertiser
        ]),
        RouterModule.forChild(routes)
    ]
})
export class ManagerReportConversionListPageModule {}
