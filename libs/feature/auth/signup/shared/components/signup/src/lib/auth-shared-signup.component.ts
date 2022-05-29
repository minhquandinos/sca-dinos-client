import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { PlatformListsInterface, PlatformListsService } from '@scaleo/platform/list/access-data';
import { AddContactComponent } from '@scaleo/shared/components/contact';
import { ConfigCustomFieldService, CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import {
    checkPassword,
    checkRepeatPassword,
    CustomValidators,
    requiredTrueForCheckbox,
    ValidationMethods
} from '@scaleo/shared/validators';

@Component({
    selector: 'auth-shared-signup',
    templateUrl: './auth-shared-signup.component.html'
})
export class AuthSharedSignupComponent implements OnInit, OnDestroy {
    @Input() allSignUpFieldsConfig: CustomFieldInterface[];

    @Input() form: FormGroup;

    @Input() requiredFieldsIds: number[];

    @Input() optionalFieldsIds: number[];

    @Input() allowSignup: boolean;

    @Input() cont: number;

    @Input() mustAgreePrivacyPolicy: boolean;

    @Input() mustAgreeTermsAndConditions: boolean;

    @Input() privacyPolicyLink: string;

    @Input() agreeTermsAndConditionsLink: string;

    @Input() isLoading: boolean;

    @Output() setRegisterUser: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    public isLoadingForm: boolean;

    public allSignUpFields: Array<any> = [];

    public platformLists: PlatformListsInterface;

    private _unsubscribe: Subject<void> = new Subject<void>();

    @ViewChild(AddContactComponent)
    private set _addContactComponent(value: AddContactComponent) {
        if (value && !this.addContactComponent) {
            this.addContactComponent = value;
        }
    }

    addContactComponent: AddContactComponent;

    constructor(
        private _configCustomFieldService: ConfigCustomFieldService,
        private _formBuilder: FormBuilder,
        private _validation: ValidationMethods,
        private _platformListsService: PlatformListsService
    ) {}

    ngOnInit(): void {
        this._initPlatformLists();
        this._initFormControls();
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    public registerUser(): void {
        if (this.form.valid) {
            this.setRegisterUser.emit({
                ...this.form.value,
                contacts: this.addContactComponent ? this.addContactComponent.removeEmptyContacts() : null
            });
        } else {
            this.form.markAllAsTouched();
        }
    }

    public get customFieldsConfig(): CustomFieldInterface[] {
        return this._configCustomFieldService.customFieldsConfig;
    }

    private _initFormControls(): void {
        const formFields: any = {
            ...this._configFormFields(this.requiredFieldsIds),
            ...this._configFormFields(this.optionalFieldsIds, false),
            password_repeat: [null, [Validators.required]],
            custom_fields: this._configCustomFieldService.createCustomFieldsGroup(),
            // field for detect and exclude auto spam registration
            second_user_name: [null]
        };

        this.form = this._formBuilder.group(formFields);
        this._setPrivatePolicyAndTermsFormFields();

        this.form.setValidators([checkRepeatPassword(), checkPassword()]);

        this.isLoadingForm = true;
    }

    private _configFormFields(fieldsId: number[], required: boolean = true): BaseObjectModel {
        const obj: BaseObjectModel = {};

        fieldsId.forEach((id) => {
            const field: any = this.allSignUpFieldsConfig.find((el) => el.id === id);

            if (field.field_name === 'password' && required) {
                obj[field.field_name] = [null, [Validators.required, Validators.minLength(8)]];
            } else if (field.field_name === 'email' && required) {
                obj[field.field_name] = [null, [Validators.required, CustomValidators.email]];
            } else if (field.field_name === 'country' && required) {
                obj[field.field_name] = [null, Validators.required];
            } else if (field.field_name === 'contacts') {
                obj[field.field_name] = this._formBuilder.array([], required ? Validators.required : null);
            } else {
                obj[field.field_name] = ['', required ? Validators.required : null];
            }

            if (!this.allSignUpFields.some((el) => field.field_name === el['field_name'])) {
                this.allSignUpFields.push({
                    name: field.field_name,
                    type: field.field_type_id
                });
            }
        });
        return obj;
    }

    private _setPrivatePolicyAndTermsFormFields(): void {
        if (this.mustAgreePrivacyPolicy) {
            this.form.addControl('agree_with_privacy_policy', new FormControl(0, [requiredTrueForCheckbox()]));
        }

        if (this.mustAgreeTermsAndConditions) {
            this.form.addControl('agree_with_terms_and_conditions', new FormControl(0, [requiredTrueForCheckbox()]));
        }
    }

    private _initPlatformLists(): void {
        this._platformListsService
            .platformListsNew('affiliates_tags,traffic_types,statuses')
            .pipe(takeUntil(this._unsubscribe))
            .subscribe((lists) => {
                this.platformLists = lists;
            });
    }

    setErrorEmail(): void {
        this.form.get('email').setErrors({ emailAlreadyTaken: true });
        this.form.markAllAsTouched();
    }
}
