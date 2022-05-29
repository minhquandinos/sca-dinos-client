import { Component, HostBinding, Input, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormGroupDirective } from '@angular/forms';

import {
    PERMISSION_FORM_CONTROL,
    PERMISSION_FORM_CONTROL_GROUP,
    PermissionUpsertConfigureItemModel
} from '@scaleo/feature-manager-settings-role-upsert-data-access';

import { keyIsRadio } from '../configuratin-role.util';

@Component({
    selector: 'scaleo-configuration-items',
    template: `
        <div [formArrayName]="permissionFormControlGroup.items">
            <ng-container *ngFor="let control of getItems; trackBy: trackByFn; let itemIndex = index; let last = last">
                <div [formGroupName]="itemIndex">
                    <ng-container *ngIf="isRadioGroup; else defaultTpl">
                        <scaleo-configuration-radio-group [items]="items"></scaleo-configuration-radio-group>
                    </ng-container>

                    <ng-template #defaultTpl>
                        <scaleo-configuration-checkbox
                            [ngClass]="{ 'permissions__item--last': last }"
                            [item]="items[itemIndex]"
                        ></scaleo-configuration-checkbox>
                    </ng-template>
                </div>
            </ng-container>
        </div>
    `,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class ConfigurationItemsComponent {
    @HostBinding('class') hostClass = 'permissions__items';

    @Input()
    items: PermissionUpsertConfigureItemModel[] = [];

    @Input()
    set groupKey(key: string) {
        this.isRadioGroup = keyIsRadio(key);
    }

    @Input()
    groupIndex: number;

    readonly permissionFormControlGroup = PERMISSION_FORM_CONTROL_GROUP;

    isRadioGroup: boolean;

    constructor(private readonly parentForm: FormGroupDirective) {}

    get getItems(): AbstractControl[] {
        return (<FormArray>(
            (<FormArray>this.parentForm.form.get(PERMISSION_FORM_CONTROL.groups)).controls[this.groupIndex].get(
                PERMISSION_FORM_CONTROL_GROUP.items
            )
        )).controls;
    }

    trackByFn(index: number): number {
        return index;
    }
}
