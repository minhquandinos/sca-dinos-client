import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Billing2LayoutModule } from '@scaleo/feature/manager/affiliate-billing/common';

import { ManagerAffiliateBillingPagesRoutingModule } from './manager-affiliate-billing-pages-routing.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, Billing2LayoutModule, ManagerAffiliateBillingPagesRoutingModule]
})
export class ManagerAffiliateBillingPagesModule {}
