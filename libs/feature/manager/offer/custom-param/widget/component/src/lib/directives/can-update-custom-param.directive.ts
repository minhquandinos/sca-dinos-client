import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { OfferCustomParamListModel } from '@scaleo/feature/manager/offer/custom-param/common';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@Directive({
    selector: '[appCanUpdateCustomParam]'
})
export class CanUpdateCustomParamDirective {
    @Input() set appCanUpdateCustomParam({ affiliates_mixed, affiliates }: OfferCustomParamListModel) {
        const canManageCustomParameters = this.check.check(this.permissions.canManageCustomParameters);
        let canUpdate = false;
        if (canManageCustomParameters) {
            canUpdate = true;
            const canAffManager = this.check.check([this.permissions.affManagerOnly, this.permissions.visibilityAssignedUsers], 'every');
            if (canAffManager) {
                canUpdate = !affiliates_mixed && affiliates.length > 0;
            }
        }

        if (canUpdate) {
            if (!this.hasView) {
                this.container.createEmbeddedView(this.templateRef);
            }

            if (this.hasView) {
                this.container.clear();
            }

            this.hasView = !this.hasView;
        }
    }

    private hasView = false;

    constructor(
        private readonly templateRef: TemplateRef<any>,
        private readonly container: ViewContainerRef,
        private readonly check: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {}
}
