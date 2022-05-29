import { Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { CustomFieldInterface, FieldTypeIdEnum } from '@scaleo/shared/data-access/custom-fields';
import { CustomValidators } from '@scaleo/shared/validators';

export type CustomFieldType = 'aff_custom_fields' | 'adv_custom_fields';

@Injectable()
export class ConfigCustomFieldService {
    customFieldsConfig: CustomFieldInterface[] = [];

    private _customFieldsConfig$: BehaviorSubject<CustomFieldInterface[]> = new BehaviorSubject([]);

    readonly customFieldsConfig$ = this._customFieldsConfig$.asObservable();

    constructor(
        private platformSettingsQuery: PlatformSettingsQuery,
        private formBuilder: FormBuilder,
        @Inject('CUSTOM_FIELDS_CONFIG') private config: CustomFieldType
    ) {
        this.loadCustomDataConfig(config);
    }

    public customFields(customFields: BaseObjectModel): BaseObjectModel[] {
        if (customFields && Object.keys(customFields).length > 0) {
            return this.customFieldsConfig.map((field) => ({
                title: field.title,
                value: customFields[field.field_name],
                type: field.field_type_id
            }));
        }
        return null;
    }

    public loadCustomDataConfig(config: CustomFieldType): void {
        const customFieldsConfig = this.platformSettingsQuery.settings?.[config] || [];
        this._customFieldsConfig$.next(customFieldsConfig);
        this.customFieldsConfig = customFieldsConfig;
    }

    public convertCustomFieldsToString(formValue: FormGroup): string {
        if (Object.keys(formValue).length > 0) {
            const customFields = {};
            Object.keys(formValue).forEach((field) => {
                const value: number | boolean = (formValue as any)[field];
                (customFields as any)[field] = typeof value === 'boolean' ? +value : value;
            });

            if (Object.keys(customFields).length > 0) {
                return JSON.stringify(customFields);
            }
        }

        return '';
    }

    createCustomFieldsGroup(validation?: boolean): FormGroup {
        const obj = {};
        this.customFieldsConfig?.forEach((field: CustomFieldInterface) => {
            (obj as any)[field.field_name] = ['', this.controlValidator(field, validation)];
        });

        return this.formBuilder.group(obj);
    }

    private controlValidator(field: any, validation = true): ValidationErrors {
        if (!validation) {
            return null;
        }

        if (field?.display_type_id === 2) {
            if (field.field_type_id === FieldTypeIdEnum.Checkbox) {
                return CustomValidators.requiredTrueForCheckbox;
            }

            return Validators.required;
        }

        return null;
    }
}
