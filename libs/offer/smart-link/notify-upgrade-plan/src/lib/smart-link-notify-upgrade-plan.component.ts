import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';

@Component({
    selector: 'scaleo-smart-link-notify-upgrade-plan',
    template: `
        <app-notification-header color="info" [close]="false" *ngxPermissionsExcept="permission">
            <app-upgrade-plan-info planPermission="smartLink" icon="upgrade_plane_in_notification"></app-upgrade-plan-info>
        </app-notification-header>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartLinkNotifyUpgradePlanComponent {
    readonly permission = [PLATFORM_PLAN_FEATURE.smartLink];
}
