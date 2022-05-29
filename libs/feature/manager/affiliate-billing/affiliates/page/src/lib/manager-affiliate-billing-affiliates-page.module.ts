import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ManagerAffiliateBillingAffiliatesListComponent,
    ManagerAffiliateBillingAffiliatesListModule
} from '@scaleo/feature/manager/affiliate-billing/affiliates/list';

@NgModule({
    imports: [
        CommonModule,
        ManagerAffiliateBillingAffiliatesListModule,
        RouterModule.forChild([
            {
                path: '',
                component: ManagerAffiliateBillingAffiliatesListComponent
            }
        ])
    ]
})
export class ManagerAffiliateBillingAffiliatesPageModule {}
