import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { InvoiceGenerateApprovedBalanceModel } from '@scaleo/feature/manager/affiliate-billing/invoice/generate/data-access';

@Component({
    selector: 'app-invoice-period-balance',
    template: `
        <section *ngIf="balance">
            <div>{{ 'invoice.generate.approved_period_balance' | translate }}:</div>
            <div class="color__green">
                {{ balance.balance | format: 'money':{ currency: balance.currency } }}
            </div>
        </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoicePeriodBalanceComponent {
    @HostBinding('class') hostClass = 'd-block';

    @Input() balance: InvoiceGenerateApprovedBalanceModel;
}
