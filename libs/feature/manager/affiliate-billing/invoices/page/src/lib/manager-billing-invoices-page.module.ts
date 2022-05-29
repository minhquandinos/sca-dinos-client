import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Billing2InvoicesComponent, Billing2InvoicesModule } from '@scaleo/feature/manager/affiliate-billing/invoices/list';

@NgModule({
    imports: [
        CommonModule,
        Billing2InvoicesModule,
        RouterModule.forChild([
            {
                path: '',
                component: Billing2InvoicesComponent
            }
        ])
    ]
})
export class ManagerBillingInvoicesPageModule {}
