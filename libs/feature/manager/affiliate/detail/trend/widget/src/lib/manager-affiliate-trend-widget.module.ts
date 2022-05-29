import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AffiliateBillingBalanceWidgetModule } from '@scaleo/affiliate-billing/balance/widget';
import { SharedModule } from '@scaleo/core/shared/module';
import { TopOfferListModule } from '@scaleo/dashboard/shared/widgets/top/components/offer/list';
import { TrendsWidgetModule } from '@scaleo/shared/components2/trends-widget';

import { ManagerAffiliateTrendWidgetComponent } from './manager-affiliate-trend-widget.component';

@NgModule({
    imports: [CommonModule, TrendsWidgetModule, SharedModule, AffiliateBillingBalanceWidgetModule, TopOfferListModule],
    declarations: [ManagerAffiliateTrendWidgetComponent],
    exports: [ManagerAffiliateTrendWidgetComponent]
})
export class ManagerAffiliateTrendWidgetModule {}
