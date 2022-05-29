import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

type SignUpType = 'advertisers' | 'affiliates';

@Component({
    selector: 'app-signup-page-link',
    templateUrl: './signup-page-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageLinkComponent {
    @Input() set signUpType(signUpType: SignUpType) {
        this._signUpType = signUpType;
        this.linkToSignUp = this.generateLink;
    }

    public _signUpType: SignUpType;

    public linkToSignUp: string;

    constructor(private platformSettingsQuery: PlatformSettingsQuery) {}

    private get generateLink(): string {
        const clientUrl = this.platformSettingsQuery.settings.client_url;
        const signUpType = this._signUpType === 'advertisers' ? 'advertiser' : 'affiliate';
        return `${clientUrl}/signup/${signUpType}`;
    }
}
