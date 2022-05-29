import { Injectable } from '@angular/core';

import { CurrencySignPositionEnum } from '@scaleo/platform/currency/models';
import { PlatformCurrencyService } from '@scaleo/platform/currency/service';

import { BaseFormat } from '../formats/base-format';

@Injectable({
    providedIn: 'root'
})
export class CurrencyFormatService extends BaseFormat<string> {
    constructor(private platformCurrencyService: PlatformCurrencyService) {
        super();
    }

    format(num: string | number, currency: string): string {
        const newNum = Number.isNaN(num) ? 0 : num;
        const { sign = undefined, position = undefined } = this.platformCurrencyService.getCurrencyByCode(currency) || {};

        const positionMap: { [K in CurrencySignPositionEnum]: string } = {
            [CurrencySignPositionEnum.LeftWithoutSpace]: `${sign}${newNum}`,
            [CurrencySignPositionEnum.RightWithSpace]: `${newNum} ${sign}`,
            [CurrencySignPositionEnum.LeftWithSpace]: `${sign} ${newNum}`,
            [CurrencySignPositionEnum.RightWithoutSpace]: `${newNum}${sign}`
        };

        return positionMap?.[position] || `${newNum} ${sign}`;
    }
}
