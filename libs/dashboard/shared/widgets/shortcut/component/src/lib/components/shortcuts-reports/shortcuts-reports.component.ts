import { Component, Inject } from '@angular/core';

import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';

@Component({
    selector: 'app-shortcuts-reports',
    templateUrl: './shortcuts-reports.component.html'
})
export class ShortcutsReportsComponent {
    constructor(
        private readonly navigateRootService: NavigateRootService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {}

    navigate(reportType: 'conversions' | 'invalid-clicks') {
        this.navigateRootService.navigate(`/transactions/${reportType}`);
    }
}
