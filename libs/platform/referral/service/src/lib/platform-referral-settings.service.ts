import { Injectable } from '@angular/core';

import { PlatformCurrencyService } from '@scaleo/platform/currency/service';
import { PlatformSettingsModel, PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Injectable({
    providedIn: 'root'
})
export class PlatformReferralSettingsService {
    constructor(private platformSettingsQuery: PlatformSettingsQuery, private readonly platformCurrencyService: PlatformCurrencyService) {}
    get settings(): PlatformSettingsModel {
        return this.platformSettingsQuery.settings;
    }

    get referralProgram(): boolean {
        return this.settings.affReferralProgram;
    }

    get referralCommissionsType(): number {
        return +this.settings?.aff_referral_commission_type;
    }

    get referralCommission(): number {
        return +this.settings?.aff_referral_commission;
    }

    get referralCommissionSource(): number {
        return this.settings?.aff_referral_commission_source;
    }

    get referralCommissionCurrency(): string {
        return this.settings.aff_referral_commission_currency;
    }

    get referralCommissionCurrencySymbol(): string {
        return this.referralCommissionCurrency ? this.platformCurrencyService.sign(this.referralCommissionCurrency) : null;
    }
}
