import { Component, HostBinding, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { PermissionUpsertConfigureGroupModel } from '@scaleo/feature-manager-settings-role-upsert-data-access';

@Component({
    selector: 'scaleo-configuration-group',
    template: `
        <div class="permissions__group-title title text-size-14 font-family-bold m-0">
            {{ 'settings.roles_permissions.groups.' + group?.key | translate }}
        </div>

        <ng-container [formGroupName]="groupIndex">
            <scaleo-configuration-items
                [items]="group?.items"
                [groupIndex]="groupIndex"
                [groupKey]="group?.key"
            ></scaleo-configuration-items>
        </ng-container>
    `,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class ConfigurationGroupComponent {
    @HostBinding('class') hostClass = 'permissions__group';

    @Input()
    group: PermissionUpsertConfigureGroupModel;
    @Input()
    groupIndex: number;
}
