import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';

@Component({
    selector: 'scaleo-affiliate-transactions-navigation',
    templateUrl: './affiliate-transactions-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateTransactionsNavigationComponent {
    constructor(@Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType) {}
}
