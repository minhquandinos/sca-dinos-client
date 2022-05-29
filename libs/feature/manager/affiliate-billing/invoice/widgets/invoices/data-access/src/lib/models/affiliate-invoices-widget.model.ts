import { Expose, Type } from 'class-transformer';

import { Billing2InvoicesAmountModel, Billing2InvoicesPaymentMethodModel } from '@scaleo/invoice/common';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

export class AffiliateInvoicesWidgetModel {
    @Expose()
    id: number = undefined;

    @Expose()
    invoice_number: string = undefined;

    @Expose()
    date: string = undefined;

    @Expose()
    payment_method: Billing2InvoicesPaymentMethodModel = undefined;

    @Expose()
    status: InvoiceStatusNameEnum = undefined;

    @Expose()
    @Type(() => Billing2InvoicesAmountModel)
    amount: Billing2InvoicesAmountModel = undefined;

    @Expose()
    period: string = undefined;
}
