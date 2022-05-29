import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';

@Directive({
    selector: '[appDisplayManagerReferrerLinkToSignUp]'
})
export class DisplayManagerReferrerLinkToSignUpDirective {
    @Input() set appDisplayManagerReferrerLinkToSignUp(baseRole: BaseRoleType) {
        const { aff_invite_enabled, adv_invite_enabled } = this.settingsQuery.settings;

        const condition = ([BASE_ROLE.advertiser, BASE_ROLE.advertiserManager] as BaseRoleType[]).includes(baseRole)
            ? adv_invite_enabled
            : aff_invite_enabled;

        if (condition && !this.hasView) {
            this.container.createEmbeddedView(this.templateRef);
            this.hasView = !this.hasView;
        }
    }

    private hasView = false;

    constructor(
        private readonly templateRef: TemplateRef<any>,
        private readonly container: ViewContainerRef,
        private readonly settingsQuery: PlatformSettingsQuery
    ) {}
}
