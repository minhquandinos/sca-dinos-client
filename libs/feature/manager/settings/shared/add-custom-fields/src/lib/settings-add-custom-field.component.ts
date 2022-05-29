import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { CustomFieldInterface, FieldsInterface, TypesFieldsBaseInterface } from '@scaleo/shared/data-access/custom-fields';
import { CustomValidators, ValidationMethods } from '@scaleo/shared/validators';

enum TypeFieldForRegistration {
    Checkbox = 3
}

@Component({
    selector: 'settings-shared-add-custom-field',
    templateUrl: './settings-add-custom-field.component.html'
})
export class SettingsAddCustomFieldComponent implements OnInit {
    @Input() fields: FieldsInterface;

    @Input() customFields: CustomFieldInterface[];

    public form: FormGroup;

    public typesFields: TypesFieldsBaseInterface[];

    constructor(private formBuilder: FormBuilder, private translate: TranslateService, private validation: ValidationMethods) {}

    ngOnInit(): void {
        this.initForm();
        this.initDelectedChangesFields();
        this.initDelectedChangesTypes();
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     const fields: SimpleChange = changes.fields;
    //     this._fields = fields.currentValue;
    //
    //     this.initDelectedChangesFields();
    //     this.initDelectedChangesTypes();
    // }

    public add(): void {
        (this.form.get('custom_fields') as FormArray).push(this.addFields());
    }

    public addFields(fields: CustomFieldInterface = null): FormGroup {
        const uniqName = Math.floor(Math.random() * (9999 - 1 + 1) + 1);

        return this.formBuilder.group({
            title: [fields ? fields.title : '', Validators.required],
            field_name: [
                fields ? fields.field_name : `custom_field_${uniqName}`,
                [Validators.required, CustomValidators.checkCustomFieldName]
            ],
            field_type_id: [fields ? fields.field_type_id : null, Validators.required],
            display_type_id: fields?.display_type_id === 2 ? 1 : 0,
            description: fields ? fields.description : ''
        });
    }

    public loadCustomFields(fields: CustomFieldInterface[]): FormGroup {
        const obj = fields.map((field) => ({
            title: [field.title, Validators.required],
            // field_name: [field.field_name, Validators.required, CustomValidators.checkCustomFieldName],
            field_type_id: [field.field_type_id, Validators.required],
            display_type_id: [field.display_type_id],
            description: [field.description]
        }));

        return this.formBuilder.group(obj);
    }

    public delete(index: number): void {
        (this.form.get('custom_fields') as FormArray).removeAt(index);
    }

    public submit(): void {
        this.validation.validateAllFormFields(this.form);
    }

    public get customFieldsArray(): FormArray {
        return this.form.get('custom_fields') as FormArray;
    }

    public changeTypeField(field: any, index: number): void {
        if (field.newValue === TypeFieldForRegistration.Checkbox) {
            (this.form.get('custom_fields') as FormArray)['controls'][index].patchValue({
                description: ''
            });
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            custom_fields: this.formBuilder.array([])
        });
    }

    private initDelectedChangesTypes(): void {
        if (this.customFields.length > 0 && this.form) {
            const fieldsArray = this.form.get('custom_fields') as FormArray;
            fieldsArray.removeAt(0);
            this.customFields.forEach((field) => {
                fieldsArray.push(this.addFields(field));
            });
        }
    }

    private initDelectedChangesFields(): void {
        if (this.fields.types['data-types'].length > 0 && this.form) {
            this.typesFields = this.fields.types['data-types'].map((type: any) => ({
                ...type,
                title: this.translate.instant(`administration_settings.affiliates.signup.${type.title.toLowerCase().split(' ').join('_')}`)
            }));
        }
    }

    public get formIsValid(): boolean {
        return this.form.valid;
    }
}
