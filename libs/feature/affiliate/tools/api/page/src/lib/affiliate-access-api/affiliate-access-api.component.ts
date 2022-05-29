import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'scaleo-affiliate-access-api',
    templateUrl: './affiliate-access-api.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateAccessApiComponent {
    public readonly enableApiForUser = this.profileQuery.enableApi;

    public readonly trackingUrl = this.platformSettings.settings.api_url;

    public readonly apiKey = this.profileQuery.profile.api_key;

    constructor(private profileQuery: ProfileQuery, private platformSettings: PlatformSettingsQuery) {}
}
