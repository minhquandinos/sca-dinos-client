import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { CustomInfoTooltipModule } from '@scaleo/shared/components';
import { CardModule, UiSkeletonModule, UiSvgIconModule } from '@scaleo/ui-kit/elements';

import { AffiliateBillingBalanceComponent } from './affiliate-billing-balance.component';
import { AffiliateBillingAvailableAdvanceComponent } from './components/affiliate-billing-available-advance/affiliate-billing-available-advance.component';
import { AffiliateBillingBalanceBlockComponent } from './components/affiliate-billing-balance-block/affiliate-billing-balance-block.component';
import { AffiliateBillingBalanceDueByCurrencyComponent } from './components/affiliate-billing-balance-due-by-currency/affiliate-billing-balance-due-by-currency.component';
import { AffiliateBillingBalanceWidgetComponent } from './components/affiliate-billing-balance-widget/affiliate-billing-balance-widget.component';
import { ShowPendingBalanceBlockDirective } from './directives/show-pending-balance-block.directive';

@NgModule({
    declarations: [
        AffiliateBillingBalanceComponent,
        AffiliateBillingBalanceBlockComponent,
        AffiliateBillingBalanceDueByCurrencyComponent,
        AffiliateBillingAvailableAdvanceComponent,
        ShowPendingBalanceBlockDirective,
        AffiliateBillingBalanceWidgetComponent
    ],
    imports: [CommonModule, UiSkeletonModule, SharedModule, UiSvgIconModule, PlatformFormatPipeModule, CardModule, CustomInfoTooltipModule],
    exports: [AffiliateBillingBalanceComponent, AffiliateBillingBalanceWidgetComponent, AffiliateBillingBalanceBlockComponent]
})
export class AffiliateBillingBalanceWidgetModule {}
