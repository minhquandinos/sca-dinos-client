import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, takeUntil } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { SettingsAdvertiserSignupModel, SettingsAdvertiserSignupService } from '@scaleo/feature/manager/data-access/settings/advertisers';
import { SettingsCardService } from '@scaleo/feature/manager/settings/shared';
import { SettingsAddCustomFieldComponent } from '@scaleo/feature/manager/settings/shared/add-custom-fields';
import { AssignNewUserIdEnum } from '@scaleo/platform/list/access-data';
import { CustomFieldInterface, FetchCustomFieldsService, FieldsInterface } from '@scaleo/shared/data-access/custom-fields';
import { ValidationMethods } from '@scaleo/shared/validators';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-mng-settings-advertiser-signup',
    templateUrl: './advertiser-signup.component.html',
    providers: [UnsubscribeService]
})
export class AdvertiserSignupComponent implements OnInit {
    @ViewChild(SettingsAddCustomFieldComponent) addCustomFieldComponent: SettingsAddCustomFieldComponent;

    public form: FormGroup;

    public formData: SettingsAdvertiserSignupModel;

    public fields: FieldsInterface;

    public customFields: CustomFieldInterface[];

    public standartFields: CustomFieldInterface[];

    public requiredFieldsList: CustomFieldInterface[] = [];

    public optionalFieldsList: CustomFieldInterface[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private fetchCustomFieldsService: FetchCustomFieldsService,
        private translate: TranslateService,
        private validation: ValidationMethods,
        private readonly settingsCardService: SettingsCardService,
        private toastr: ToastrBarService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly service: SettingsAdvertiserSignupService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.loadFormData();

        this.settingsCardService.saveSubject.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            this.save();
        });
    }

    public save(): void {
        if (this.addCustomFieldComponent.formIsValid && this.form.valid) {
            if (this.addCustomFieldComponent.form.value.custom_fields) {
                const customFields = [...this.addCustomFieldComponent.form.value.custom_fields].map((field) => ({
                    ...field,
                    display_type_id: field.display_type_id ? 2 : 3
                }));

                this.form.patchValue({
                    custom_fields: customFields
                });
            }

            this.service
                .update(this.form.value)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(() => {
                    this.toastr.successes(this.translate.instant('administration_settings.affiliates.signup.save_notification'));
                });
        } else {
            this.addCustomFieldComponent.submit();
            this.validation.validateAllFormFields(this.form);
        }
    }

    public addRemoveFields(event: any, type: 'add' | 'remove', list: 'required' | 'optional' = null): void {
        const compareId = type === 'add' ? event.id : event.value.id;
        // eslint-disable-next-line no-nested-ternary
        const displayTypeId = type === 'add' ? (list === 'required' ? 2 : 3) : 1;

        const index = this.standartFields.findIndex((field) => field.id === compareId);
        this.standartFields[index].display_type_id = displayTypeId;

        this.updateFieldsList();
    }

    public clearAllField(list: 'required' | 'optional'): void {
        const displayTypeId = list === 'required' ? 2 : 3;

        this.standartFields = this.standartFields.map((field) => {
            if (field.display_type_id === displayTypeId) {
                return {
                    ...field,
                    display_type_id: 1
                };
            }
            return {
                ...field
            };
        });

        this.updateFieldsList();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            allow_advertiser_signup: [''],
            signup_process: 0,
            required_fields: ['', Validators.required],
            optional_fields: [''],
            custom_fields: [''],
            must_agree_with_terms_and_conditions: [''],
            must_agree_with_privacy_policy: [''],
            custom_signup_url: [''],
            redirect_url_after_signup: [''],
            invite_enabled: BooleanEnum.True,
            random_manager_enabled: AssignNewUserIdEnum.All,
            default_managers: []
        });
    }

    private loadFormData(): void {
        this.service
            .view()
            .pipe(
                switchMap((signup) => {
                    this.formData = signup;

                    this.form.patchValue({
                        ...this.formData
                    });

                    this.customFields = this.formData.custom_fields;

                    return this.fetchCustomFieldsService.fields('advertiser');
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe((fields: FieldsInterface) => {
                this.fields = fields;
                this.standartFields = fields['standard-fields'].filter((field) => field.id !== 34 && field.id !== 35);

                this.updateFieldsList();

                const { required_fields, optional_fields } = this.form.value;

                this.clearAllField('optional');

                this.optionalFieldsList.forEach((field) => {
                    if (optional_fields.includes(field.id)) {
                        this.addRemoveFields({ id: field.id }, 'add', 'optional');
                    }
                });

                this.requiredFieldsList.forEach((field) => {
                    if (required_fields.includes(field.id)) {
                        this.addRemoveFields({ id: field.id }, 'add', 'required');
                    }
                });
            });
    }

    private customPatchValue(key: string, value: boolean): void {
        this.form.patchValue({
            [key]: value
        });
    }

    private updateFieldsList(): void {
        this.requiredFieldsList = this.standartFields.filter((field) => field.display_type_id === 2 || field.display_type_id === 1);
        this.optionalFieldsList = this.standartFields.filter((field) => field.display_type_id === 3 || field.display_type_id === 1);
    }
}
