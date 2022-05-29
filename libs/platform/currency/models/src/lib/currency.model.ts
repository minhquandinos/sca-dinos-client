import { BaseIdTitleModel } from '@scaleo/core/data';

export type CurrencyType = Uppercase<string>;

export const enum CurrencySignPositionEnum {
    LeftWithoutSpace = 1,
    RightWithSpace = 2,
    LeftWithSpace = 3,
    RightWithoutSpace = 4
}

export interface PlatformCurrencyModel extends Pick<BaseIdTitleModel, 'title'> {
    code: string;
    sign: string;
    position: CurrencySignPositionEnum;
}

export enum CurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    INR = 'INR',
    JPY = 'JPY',
    GBP = 'GBP',
    RUB = 'RUB',
    PLN = 'PLN',
    CZK = 'CZK',
    BRL = 'BRL',
    CAD = 'CAD',
    CNY = 'CNY',
    IDR = 'IDR',
    KZT = 'KZT',
    CHF = 'CHF',
    THB = 'THB',
    UAH = 'UAH',
    VND = 'VND',
    AUD = 'AUD',
    SEK = 'SEK',
    BYN = 'BYN',
    DKK = 'DKK',
    HKD = 'HKD',
    HUF = 'HUF',
    ILS = 'ILS',
    KRW = 'KRW',
    MXN = 'MXN',
    NOK = 'NOK',
    SGD = 'SGD',
    TRY = 'TRY',
    AZN = 'AZN',
    ZAR = 'ZAR',
    BTC = 'BTC',
    ETH = 'ETH',
    PLT = 'PLT'
}

// export enum CurrencySymbolEnum {
//     USD = '$',
//     EUR = '€',
//     INR = '₹',
//     JPY = '¥',
//     GBP = '£',
//     RUB = '₽',
//     PLN = 'zł',
//     CZK = 'Kč',
//     BRL = 'R$',
//     CAD = '$',
//     CNY = '¥',
//     IDR = 'Rp',
//     KZT = '₸',
//     CHF = 'Fr',
//     THB = '฿',
//     UAH = '₴',
//     VND = '₫',
//     AUD = '$',
//     SEK = 'kr',
//     BYN = 'Br',
//     DKK = 'kr',
//     HKD = '$',
//     HUF = 'ƒ',
//     ILS = '₪',
//     KRW = '₩',
//     MXN = '$',
//     NOK = 'kr',
//     SGD = '$',
//     TRY = '₺',
//     AZN = '₼',
//     ZAR = 'R',
//     BTC = '₿',
//     ETH = 'ETH',
//     PLT = '$PLOT'
// }
