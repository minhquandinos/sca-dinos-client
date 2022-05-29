import { BooleanEnum } from '@scaleo/core/data';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';

export interface Billing2InvoiceGenerateRequestDto {
    affiliate_id: string;
    start_date: string;
    end_date: string;
    payment_methods: string;
    currency: string;
    include_referral_balance: BooleanEnum;
    invoice_memo: string;
    internal_notes: string;
    status: Omit<InvoiceStatusNameEnum, InvoiceStatusNameEnum.Paid>;
    attachment_file: File;
    amount: number;
}
