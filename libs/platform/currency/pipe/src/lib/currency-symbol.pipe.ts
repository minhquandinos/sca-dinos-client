import { Pipe, PipeTransform } from '@angular/core';

import { PlatformCurrencyService } from '@scaleo/platform/currency/service';

@Pipe({
    name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {
    constructor(private readonly platformCurrencyService: PlatformCurrencyService) {}

    transform(currency: string): string {
        return this.platformCurrencyService.sign(currency);
    }
}
