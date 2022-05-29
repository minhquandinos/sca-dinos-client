import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

import { Billing2InvoiceItemModel } from './invoice-transaction.model';

export interface Billing2InvoiceDetailResponseModel {
    id: number;
    invoice_number: string;
    affiliate: {
        id: number;
        name: string;
    };
    status: InvoiceStatusNameEnum;
    currency: CurrencyEnum;
    beneficiary_name: string;
    beneficiary_address: string;
    billing_email: string;
    tax_id: string;
    payment_method: any;
    invoice_memo: string;
    internal_notes: string;
    attachment: string;
    adjustments: string;
    adjustments_info: string;
    advance_minus: string;
    advance_plus: string;
    period: string;
    referral_amount: string;
    vat: number;
    vat_amount: string;
    subtotal: string;
    total: string;
    transactions_amount: string;
    items: Billing2InvoiceItemModel[];
    date_gen: string;
    date_due: string;
    start_date: string;
    end_date: string;
}
