import { Injectable } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import {
    ConfigFormatDateType,
    ConfigFormatInterface,
    ConfigFormatMoneyModel,
    ConfigFormatNumberModel,
    NumberFormatEnum,
    TransformFormatEnum,
    TransformFormatType
} from '@scaleo/platform/format/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

import { Format } from './format';
import { FormatServiceInterface } from './format-service.interface';
import { CurrencyFormatService } from './services/currency-format.service';
import { DateFormatService } from './services/date-format.service';
import { IdNameFormatService } from './services/id-name-format.service';

// TODO complete refactor
@Injectable({ providedIn: 'root' })
export class FormatService implements FormatServiceInterface {
    constructor(
        private readonly profileQuery: ProfileQuery,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly dateFormatService: DateFormatService,
        private readonly idNameFormatService: IdNameFormatService,
        private readonly currencyFormatService: CurrencyFormatService
    ) {}

    private static transformNumber(num: number, id: number, maximumFractionDigits: number | undefined = 0): string {
        let optionsFormat = {};
        if (typeof maximumFractionDigits === 'number') {
            optionsFormat = {
                maximumFractionDigits,
                minimumFractionDigits: maximumFractionDigits
            };
        }

        switch (id) {
            case 1: // 1,234,567.89
                return num.toLocaleString('en-EN', optionsFormat);
            case 2:
                return num.toLocaleString('uk-UA', optionsFormat).replace(',', '.');
            case 4:
                return num.toLocaleString('de-DE', optionsFormat);
            case 5: // 12,34,567.89
                return num.toLocaleString('en-US', optionsFormat);
            case 3:
            default:
                return num.toLocaleString('fr-FR', optionsFormat);
        }
    }

    static getFormatForKey(key: string): TransformFormatType {
        if (Format.percent.includes(key)) {
            return TransformFormatEnum.Percent;
        }
        if (Format.money.includes(key)) {
            return TransformFormatEnum.Money;
        }
        if (Format.date.includes(key)) {
            return TransformFormatEnum.Date;
        }
        if (Format.coasting.includes(key)) {
            return TransformFormatEnum.Coasting;
        }
        return undefined;
    }

    private static countFractionDigits(num: number): number {
        if (num && !Number.isInteger(num)) {
            if (num.toString().split('.').length === 1) {
                return 0;
            }
            const digits = num.toString().split('.').pop();
            return digits.length;
        }
        return 0;
    }

    // TODO complete refactor
    get shortDateFormat(): string {
        return this.dateFormatService.shortDateFormat;
    }

    // TODO complete refactor
    format(value: any, type?: TransformFormatEnum.Date | string, config?: ConfigFormatDateType): string;
    format(value: any, type?: TransformFormatEnum.Number | TransformFormatEnum.Percent | string, config?: ConfigFormatNumberModel): string;
    format(value: any, type?: TransformFormatEnum.Money | TransformFormatEnum.Coasting | string, config?: ConfigFormatMoneyModel): string;
    format(value: any, type: TransformFormatEnum.IdName | string, config: number): string;
    format(value: any, type: any, config?: any): string {
        let countDigitsNumber;
        switch (type) {
            case TransformFormatEnum.IdName:
                return this.idNameFormatService.format(value, config);
            case TransformFormatEnum.Number:
                if (config?.digitsAfterPoint === null) {
                    countDigitsNumber = null;
                } else if (FormatService.countFractionDigits(value) > 0) {
                    countDigitsNumber = config?.digitsAfterPoint ? Number.isInteger(config?.digitsAfterPoint) : 2;
                } else {
                    countDigitsNumber = 0;
                }

                return FormatService.transformNumber(+value, this.numberFormatId, countDigitsNumber as number);
            case TransformFormatEnum.Percent:
                if (config?.digitsAfterPoint === null) {
                    countDigitsNumber = null;
                } else {
                    countDigitsNumber = Number.isInteger(config?.digitsAfterPoint) ? config.digitsAfterPoint : 2;
                }

                return `${FormatService.transformNumber(+value, this.numberFormatId, countDigitsNumber)}%`;
            case TransformFormatEnum.Coasting:
            case TransformFormatEnum.Money: {
                if (config?.digitsAfterPoint === null) {
                    countDigitsNumber = null;
                } else if (config?.digitsAfterPoint || config?.digitsAfterPoint === 0) {
                    countDigitsNumber = config.digitsAfterPoint;
                } else {
                    const defaultCount: number = type === TransformFormatEnum.Coasting ? 4 : 2;
                    countDigitsNumber = FormatService.countFractionDigits(value) === 2 ? 2 : defaultCount;
                }

                const transformMoney = FormatService.transformNumber(+value, this.numberFormatId, countDigitsNumber);
                if (config && config.currency) {
                    return this.addCurrencySymbolToMoney(transformMoney, +value, config.currency);
                }

                return this.addCurrencySymbolToMoney(transformMoney, +value);
            }
            case TransformFormatEnum.Date: {
                return this.dateFormatService.format(value, config);
            }
            default:
                return value;
        }
    }

    formatByKey(value: any, key: string, config: ConfigFormatInterface = null): string {
        let newConfig: ConfigFormatInterface = config;
        if (!newConfig && Format.fractionDigits[key] !== undefined && Format.fractionDigits[key] !== null) {
            newConfig = {
                ...newConfig,
                digitsAfterPoint: Format.fractionDigits[key]
            };
        }

        const keyType = FormatService.getFormatForKey(key);
        if (keyType) {
            return this.format(value, keyType, newConfig);
        }
        if (!!value && !Number.isNaN(+value) && typeof +value === 'number') {
            return this.format(+value, TransformFormatEnum.Number, newConfig);
        }
        if (/([0-9]{4}[-][0-9]{2}[-][0-9]{2})/.test(value)) {
            return this.format(value, TransformFormatEnum.Date, 'fullDate');
        }
        return this.format(value);
    }

    private addCurrencySymbolToMoney(num: string, origNum: number, currency?: string): string {
        let defaultCurrency: string;
        if (currency) {
            defaultCurrency = currency;
        } else {
            defaultCurrency = this.platformSettingsQuery.settings.currency;
        }

        const newNum = Number.isNaN(origNum) ? 0 : num;
        return this.currencyFormatService.format(newNum, defaultCurrency);
    }

    private get numberFormatId(): NumberFormatEnum {
        return this.profileQuery.profile ? this.profileQuery.profile.number_format_id : NumberFormatEnum.DE;
    }
}
