import { Pipe, PipeTransform } from '@angular/core';

import { CurrencySymbolPipe } from '@scaleo/platform/currency/pipe';
import { GoalTypeEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'revenuePayoutSymbol'
})
export class RevenuePayoutSymbolPipe implements PipeTransform {
    constructor(private readonly currencySymbolPipe: CurrencySymbolPipe) {}

    transform(type: GoalTypeEnum, currency: string): string {
        return type === GoalTypeEnum.CPS ? '%' : this.currencySymbolPipe.transform(currency);
    }
}
