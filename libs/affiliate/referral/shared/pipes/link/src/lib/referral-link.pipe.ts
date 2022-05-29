import { Pipe, PipeTransform } from '@angular/core';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Pipe({
    name: 'referralLink'
})
export class ReferralLinkPipe implements PipeTransform {
    constructor(private platformSettingsQuery: PlatformSettingsQuery) {}

    transform(affiliateId: number): string {
        return (this.customReferralUrl || this.defaultReferralUrl).replace('{affiliate_id}', String(affiliateId));
    }

    private get defaultReferralUrl(): string {
        return `${this.platformSettingsQuery?.settings.client_url}/auth/signup-affiliate?ref={affiliate_id}`;
    }

    private get customReferralUrl(): string {
        return this.platformSettingsQuery.settings.referral_custom_url;
    }
}
