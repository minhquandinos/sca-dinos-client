import { Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { PERMISSION_FORM_CONTROL_ITEM, PermissionUpsertConfigureItemModel } from '@scaleo/feature-manager-settings-role-upsert-data-access';

@Component({
    selector: 'scaleo-configuration-radio-group',
    template: `
        <app-radio-group [formControlName]="permissionFormControlItem.item" alignment="column">
            <app-radio
                *ngFor="let item of items; trackBy: trackByFn; let last = last"
                [inputValue]="item.id"
                [label]="item?.key | permissionTranslate | async"
            ></app-radio>
        </app-radio-group>
    `,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class ConfigurationRadioGroupComponent {
    @Input()
    items: PermissionUpsertConfigureItemModel[] = [];

    readonly permissionFormControlItem = PERMISSION_FORM_CONTROL_ITEM;

    trackByFn(index: number): number {
        return index;
    }
}
