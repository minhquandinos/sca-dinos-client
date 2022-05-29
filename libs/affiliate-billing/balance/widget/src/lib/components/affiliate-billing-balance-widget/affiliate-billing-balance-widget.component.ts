import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { AffiliateBillingBalanceComponent } from '../../affiliate-billing-balance.component';

@Component({
    selector: 'scaleo-affiliate-billing-balance-widget',
    templateUrl: './affiliate-billing-balance-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateBillingBalanceWidgetComponent {
    @ViewChild(AffiliateBillingBalanceComponent, { static: true })
    affiliateBillingBalanceComponent: AffiliateBillingBalanceComponent;

    @Input()
    affiliateId: number;

    @Input()
    showPendingBalance!: boolean;

    reload(): void {
        this.affiliateBillingBalanceComponent.reload();
    }
}
