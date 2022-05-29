import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

import { SmartLinkStatusesEnum } from '@scaleo/offer/smart-link/common';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@Directive({
    selector: '[scaleoShowDividerInSmartLinksTableNav]'
})
export class ShowDividerInSmartLinksTableNavDirective {
    @Input() set scaleoShowDividerInSmartLinksTableNav(status: SmartLinkStatusesEnum) {
        const hasPermission = this.checkPermissionService.check(this.permissions.canAddEditDeleteSmartLinks);
        const condition = hasPermission || status === SmartLinkStatusesEnum.Active;

        if (!condition && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (condition && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }

    private hasView = false;

    constructor(
        private ngxPermission: NgxPermissionsService,
        private checkPermissionService: CheckPermissionService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}
}
