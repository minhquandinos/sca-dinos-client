import { Expose, Type } from 'class-transformer';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

export class Billing2InvoicesAffiliateModel {
    @Expose()
    id: number = undefined;

    @Expose()
    name: string = undefined;
}

export class Billing2InvoicesAmountModel {
    @Expose()
    value: string = undefined;

    @Expose()
    currency: CurrencyEnum = undefined;
}

// @JsonObject('Billing2InvoicesStatusModel')
// export class Billing2InvoicesStatusModel {
//     @JsonProperty('id', Number)
//     id: number = undefined;
//
//     @JsonProperty('title', String)
//     title: string = undefined;
// }

export class Billing2InvoicesPaymentMethodModel {
    @Expose()
    id: number = undefined;

    @Expose()
    image: string = undefined;

    @Expose()
    info: string = undefined;

    @Expose()
    title: string = undefined;
}

export class InvoicesModel {
    @Expose()
    id: number = undefined;

    @Expose()
    invoice_number: string = undefined;

    @Expose()
    date: string = undefined;

    @Expose()
    @Type(() => Billing2InvoicesAffiliateModel)
    affiliate: Billing2InvoicesAffiliateModel = undefined;

    @Expose()
    @Type(() => Billing2InvoicesPaymentMethodModel)
    payment_method: Billing2InvoicesPaymentMethodModel = undefined;

    @Expose()
    status: InvoiceStatusNameEnum = undefined;

    @Expose()
    @Type(() => Billing2InvoicesAmountModel)
    amount: Billing2InvoicesAmountModel = undefined;

    @Expose()
    attachment: string = undefined;

    @Expose()
    internal_notes: string = undefined;

    @Expose()
    period: string = undefined;
}

export interface InvoicesAmount {
    currency: CurrencyEnum;
    invoices_total_amount: string;
}

export interface InvoiceMultiDeleteQueryParamsDto {
    invoices: string;
}

export interface InvoiceMultiChangeStatusQueryParamsDto {
    invoices: string;
    new_status: InvoiceStatusNameEnum;
}
