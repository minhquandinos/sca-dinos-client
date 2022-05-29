import { CurrencyEnum } from '@scaleo/platform/currency/models';

export interface InvoiceGenerateApprovedBalanceQueryParamsDto {
    currency: CurrencyEnum;
    start_date: string;
    end_date: string;
    affiliate_id: string;
}

export interface InvoiceGenerateApprovedBalanceDto {
    approved_balance: string | number;
}

export interface InvoiceGenerateApprovedBalanceModel {
    balance: string | number;
    currency: CurrencyEnum;
}
