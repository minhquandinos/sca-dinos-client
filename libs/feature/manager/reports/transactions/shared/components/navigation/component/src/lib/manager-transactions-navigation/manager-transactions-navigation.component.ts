import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@Component({
    selector: 'scaleo-manager-transactions-navigation',
    templateUrl: './manager-transactions-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerTransactionsNavigationComponent {
    readonly showAdjustments$ = this.checkPermissionService.check$(
        [
            this.permissions.canChangeConversionStatus,
            this.permissions.canAccessAdjustments,
            this.permissions.canAccessOffers,
            this.permissions.canAccessAffiliates
        ],
        'every'
    );

    constructor(
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}
}
