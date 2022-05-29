import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Component({
    selector: 'app-manager-referrer-link-to-sign-up',
    template: `
        <div class="title is-5">{{ title }}</div>

        <app-field-text-info preset="copy">{{ link }}</app-field-text-info>

        <div class="form-text mt-2">{{ description }}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerReferrerLinkToSignUpComponent {
    @Input() id: number;

    @Input()
    set role(role: BaseRoleType) {
        this.setReferrerLinkFor(role);
        this.initLinks();
        this.initTitleAndDescription();
        this.cdr.markForCheck();
    }

    referrerLinkFor: 'advertiser' | 'affiliate';

    link: string;

    title: string;

    description: string;

    constructor(
        private readonly settingsQuery: PlatformSettingsQuery,
        private readonly translate: TranslateService,
        private readonly cdr: ChangeDetectorRef
    ) {}

    private setReferrerLinkFor(role: BaseRoleType): void {
        this.referrerLinkFor = ([BASE_ROLE.advertiser, BASE_ROLE.advertiserManager] as BaseRoleType[]).includes(role)
            ? 'advertiser'
            : 'affiliate';
    }

    private initLinks(): void {
        const link = new URL(`signup/${this.referrerLinkFor}`, this.settingsQuery.settings.client_url);
        link.searchParams.set('m', this.id.toString());
        this.link = link.href;
    }

    private initTitleAndDescription(): void {
        const translateSchema = `profile.invitation_link.${this.referrerLinkFor}`;
        this.title = this.translate.instant(`${translateSchema}.title`);
        this.description = this.translate.instant(`${translateSchema}.description`);
    }
}
