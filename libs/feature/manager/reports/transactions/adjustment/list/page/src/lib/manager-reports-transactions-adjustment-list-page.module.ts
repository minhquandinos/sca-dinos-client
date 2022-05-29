import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdjustmentsComponent, AdjustmentsModule } from '@scaleo/feature/manager/reports/transactions/adjustment/list/component';

@NgModule({
    imports: [
        CommonModule,
        AdjustmentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdjustmentsComponent
            }
        ])
    ]
})
export class ManagerReportsTransactionsAdjustmentListPageModule {}
