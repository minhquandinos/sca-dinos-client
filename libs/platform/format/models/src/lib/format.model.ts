import { CurrencyEnum } from '@scaleo/platform/currency/models';

export interface ConfigFormatNumberModel {
    digitsAfterPoint?: number | null;
}

export interface ConfigFormatMoneyModel extends ConfigFormatNumberModel {
    currency?: string;
}

export const enum TransformFormatEnum {
    IdName = 'idName',
    Number = 'number',
    Date = 'date',
    Money = 'money',
    Percent = 'percent',
    Coasting = 'coasting'
}

const TRANSFORM_FORMAT = {
    idName: 'idName',
    number: 'number',
    date: 'date',
    money: 'money',
    percent: 'percent',
    coasting: 'coasting'
} as const;

export type TransformFormatType = typeof TRANSFORM_FORMAT[keyof typeof TRANSFORM_FORMAT];

export interface ConfigFormatInterface {
    currency?: CurrencyEnum;
    digitsAfterPoint?: number | null;
}
