import { CurrencyEnum } from '@scaleo/platform/currency/models';

export interface InvoiceGeneratePaymentInfoDto {
    affiliate_id: number;
    currency: CurrencyEnum;
}
