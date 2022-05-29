import { Expose, Transform, Type } from 'class-transformer';

import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { Util } from '@scaleo/utils';

export interface AffiliateBillingPayloadParamsDto {
    readonly affiliate_id?: number;
    readonly currency: CurrencyEnum;
    readonly amount: number;
    readonly attachment_file?: File;
}

export interface AffiliateBillingPaymentsMethodDetailDto {
    id: number;
    affiliate_id: number;
    payment_method: {
        id: number;
        title: string;
        status: number;
        supported_currencies: string;
        payment_threshold: string;
        payment_threshold_currency: CurrencyEnum;
        payment_commission: string;
        payment_method_logo: string;
        created: number;
        updated: number;
        sort: number;
    };
    payment_method_info?: string;
    currency: CurrencyEnum;
    balance_due?: number;
    approved_balance?: number;
    next_interval_date: string;
    payment_method_threshold_converted: number;
}

export class PaymentsMethodDetailModel {
    @Expose()
    id: number = undefined;

    @Expose()
    title: string = undefined;

    @Expose()
    status: number = undefined;

    @Expose()
    supported_currencies: string = undefined;

    @Expose()
    payment_threshold: string = undefined;

    @Expose()
    payment_threshold_currency: CurrencyEnum = undefined;

    @Expose()
    payment_commission: string = undefined;

    @Expose()
    payment_method_logo: string = undefined;

    @Expose()
    created: number = undefined;

    @Expose()
    updated: number = undefined;

    @Expose()
    sort: number = undefined;
}

export class BillingAffiliatePaymentsMethodModel {
    @Expose()
    id: number | string = undefined;

    @Expose()
    affiliate_id: number = undefined;

    @Expose()
    @Type(() => PaymentsMethodDetailModel)
    payment_method: PaymentsMethodDetailModel = undefined;

    @Expose()
    payment_method_info?: string = undefined;

    @Expose()
    currency: CurrencyEnum = undefined;

    @Expose()
    balance_due?: number = undefined;

    @Expose()
    approved_balance?: number = undefined;

    @Expose()
    next_interval_date: string = undefined;

    @Expose()
    @Transform(({ value }) => Util.stringToNumber(value), { toClassOnly: true })
    payment_method_threshold_converted: string = undefined;

    @Expose()
    get thresholdConverted(): number {
        return Util.stringToNumber(this.payment_method_threshold_converted);
    }
}
