import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pluck } from 'rxjs/operators';

import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'auth-terms-conditions',
    template: `
        <a *ngIf="termsUrl$ | async as termsCondUrl" target="_blank" class="footer-item" [href]="termsCondUrl">
            {{ 'TERMS' | translate }}
        </a>
        <a *ngIf="privacyPolicyUrl$ | async as privacyPolicyUrl" target="_blank" class="footer-item" [href]="privacyPolicyUrl">
            {{ 'POLICY' | translate }}
        </a>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthTermsConditionsComponent {
    termsUrl$ = this.platformSettingsQuery.settings$.pipe(pluck('terms_and_conditions_url'));

    privacyPolicyUrl$ = this.platformSettingsQuery.settings$.pipe(pluck('privacy_policy_url'));

    constructor(private platformSettingsQuery: PlatformSettingsQuery) {}
}
