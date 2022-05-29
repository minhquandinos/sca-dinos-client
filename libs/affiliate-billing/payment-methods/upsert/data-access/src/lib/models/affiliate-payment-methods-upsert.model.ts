import { CurrencyEnum } from '@scaleo/platform/currency/models';

export interface CreatePaymentMethodModel {
    currency: CurrencyEnum;
    payment_method_id: number;
    payment_method_info: string;
    affiliate_id?: number;
}

export interface PaymentMethodBySupportedCurrencyModel {
    id: number;
    title: string;
    payment_commission: string;
    payment_threshold: string;
    payment_method_logo: string;
    payment_threshold_currency: CurrencyEnum;
}
