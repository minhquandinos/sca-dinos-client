import { Component, HostBinding, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { PERMISSION_FORM_CONTROL_ITEM, PermissionUpsertConfigureItemModel } from '@scaleo/feature-manager-settings-role-upsert-data-access';

@Component({
    selector: 'scaleo-configuration-checkbox',
    template: `
        <app-custom-checkbox
            [formControlName]="permissionFormControlItem.item"
            [label]="item?.key | permissionTranslate | async"
            [checkboxId]="'permission_' + item?.id"
        ></app-custom-checkbox>
    `,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class ConfigurationCheckboxComponent {
    @HostBinding('class') hostClass = 'permissions__item';

    @Input()
    item: PermissionUpsertConfigureItemModel;

    readonly permissionFormControlItem = PERMISSION_FORM_CONTROL_ITEM;
}
