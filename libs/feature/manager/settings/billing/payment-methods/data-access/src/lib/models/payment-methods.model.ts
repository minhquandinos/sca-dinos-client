import { Any, JsonObject, JsonProperty } from 'json2typescript';

import { CurrencyEnum } from '@scaleo/platform/currency/models';

@JsonObject('PaymentMethodsModel')
export class PaymentMethodsModel {
    @JsonProperty('id', Number, true)
    id?: number = undefined;

    @JsonProperty('title', String)
    title: string = undefined;

    @JsonProperty('payment_threshold', Any)
    private _payment_threshold: string = undefined;

    get payment_threshold(): number | any {
        return +this._payment_threshold || '0.00';
    }

    set payment_threshold(value: any) {
        this._payment_threshold = value;
    }

    @JsonProperty('payment_commission', Any)
    private _payment_commission: string = undefined;

    get payment_commission(): number | any {
        return +this._payment_commission || 0;
    }

    @JsonProperty('payment_method_logo')
    payment_method_logo: string = undefined;

    @JsonProperty('payment_threshold_currency')
    payment_threshold_currency: CurrencyEnum = undefined;

    @JsonProperty('status', Number)
    status: any = undefined;

    @JsonProperty('supported_currencies')
    supported_currencies: string = undefined;

    public get supportedCurrenciesTransformToArray(): string[] {
        return this.supported_currencies ? this.supported_currencies.split(',') : [];
    }

    public get supportedAllCurrencies(): boolean {
        return this.supportedCurrenciesTransformToArray?.length === 0;
    }

    public get supportedCurrenciesTransformToString(): string {
        return this.supportedCurrenciesTransformToArray?.length > 0 ? this.supportedCurrenciesTransformToArray.join(', ') : '';
    }

    @JsonProperty('image_data', String, true)
    image_data?: string = undefined;

    @JsonProperty('created', Number, true)
    created?: number = undefined;

    @JsonProperty('updated', Number, true)
    updated?: number = undefined;

    @JsonProperty('sort', Number, true)
    sort?: number = undefined;
}

export interface PaymentMethodsRequestModel {
    title: string;
    status: number;
    supported_currencies: string;
    payment_threshold: number;
    payment_threshold_currency: CurrencyEnum;
    payment_commission: string;
    payment_method_logo: string;
    image_data?: string;
    sort?: number;
}
