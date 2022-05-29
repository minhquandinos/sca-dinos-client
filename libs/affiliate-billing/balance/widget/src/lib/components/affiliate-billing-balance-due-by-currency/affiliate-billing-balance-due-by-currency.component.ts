import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { BalanceDueByCurrencyModel } from '@scaleo/affiliate-billing/balance/data-access';

@Component({
    selector: 'app-affiliate-billing-balance-due-by-currency',
    templateUrl: './affiliate-billing-balance-due-by-currency.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateBillingBalanceDueByCurrencyComponent {
    @Input() balances: BalanceDueByCurrencyModel[];

    @HostBinding('class') hostClass = 'affiliate-billing-balance__breakdown-by-currency d-block p-2 bg__light-gray3';
}
