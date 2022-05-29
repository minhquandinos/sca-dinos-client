import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PlatformCurrencyModel } from '@scaleo/platform/currency/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Injectable({
    providedIn: 'root'
})
export class PlatformCurrencyService {
    constructor(private readonly platformSettingsQuery: PlatformSettingsQuery) {}

    sign(currency: string): string {
        return this.getCurrencyByCode(currency)?.sign || '';
    }

    getCurrencyByCode(currency: string): PlatformCurrencyModel {
        return this.currencies.find((elem) => elem.code === currency) || undefined;
    }

    get currencies(): PlatformCurrencyModel[] {
        return this.platformSettingsQuery.settings.currencies;
    }

    get currencies$(): Observable<PlatformCurrencyModel[]> {
        return this.platformSettingsQuery.select('currencies');
    }
}
