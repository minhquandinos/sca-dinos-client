import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { PLATFORM_PLAN_FEATURE_TOKEN, PlatformPlanFeatureType } from '@scaleo/platform-permission-plan-common';

@Component({
    selector: 'scaleo-manager-statistics-navigation',
    templateUrl: './manager-statistics-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerStatisticsNavigationComponent {
    readonly enabledReferral = this.platformSettingsQuery.settings.affReferralProgram;

    constructor(
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        @Inject(PLATFORM_PLAN_FEATURE_TOKEN) public readonly planFeature: PlatformPlanFeatureType
    ) {}
}
