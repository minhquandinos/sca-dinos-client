import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-affiliate-billing-available-advance',
    template: `
        <span class="pr-1 color__gray2 font-size is-7">{{ 'billing2.balance.advance' | translate }}</span>
        <span class="pl-1 color__gray2 font-size is-7 text-nowrap">{{ availableAdvance | format: 'money' }}</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateBillingAvailableAdvanceComponent {
    @Input() availableAdvance: number;

    @HostBinding('class') hostClass = 'd-flex justify-content-between p-2 border-radius-4 bg__light-gray3 w-100 line-height is-16';
}
