import { Expose, Type } from 'class-transformer';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

import { Billing2InvoicesAffiliateModel, Billing2InvoicesPaymentMethodModel } from '../../models/invoices.model';

export class InvoiceInfoModel {
    @Expose()
    id: number = undefined;

    @Expose()
    invoice_number: string = undefined;

    @Expose()
    @Type(() => Billing2InvoicesAffiliateModel)
    affiliate: Billing2InvoicesAffiliateModel = undefined;

    @Expose()
    @Type(() => Billing2InvoicesPaymentMethodModel)
    payment_method: Billing2InvoicesPaymentMethodModel = undefined;

    @Expose()
    status: InvoiceStatusNameEnum = undefined;

    @Expose()
    attachment: string = undefined;

    @Expose()
    internal_notes: string = undefined;

    @Expose()
    start_date?: string = undefined;

    @Expose()
    end_date?: string = undefined;

    @Expose()
    date_gen?: string = undefined;

    @Expose()
    date_due?: string = undefined;

    @Expose()
    beneficiary_name: string = undefined;

    @Expose()
    beneficiary_address: string = undefined;

    @Expose()
    billing_email: string = undefined;

    @Expose()
    invoice_memo: string = undefined;

    @Expose()
    currency: CurrencyEnum = undefined;

    @Expose()
    tax_id: string = undefined;

    @Expose()
    vat: number = undefined;

    @Expose()
    period: number = undefined;
}
