import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Billing2InvoiceSummaryModel } from '@scaleo/invoice/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

@Component({
    selector: 'app-billing2-invoice-summary',
    templateUrl: './billing2-invoice-summary.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Billing2InvoiceSummaryComponent {
    @Input() data: Billing2InvoiceSummaryModel;

    @Input() currency: CurrencyEnum;

    @Input() status: InvoiceStatusNameEnum;

    readonly invoiceStatusNameEnum = InvoiceStatusNameEnum;
}
