import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, take, throwError } from 'rxjs';

import { PROFILE_API_STATUS } from '@scaleo/account/common';
import { NewProfileService, ProfileModel, ProfileRequestModel } from '@scaleo/account/data-access';
import { BaseObjectModel, BooleanEnum, ShortResponseInterface } from '@scaleo/core/data';
import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { AddContactComponent } from '@scaleo/shared/components/contact';
import { CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { checkPassword, checkRepeatPassword, CustomValidators } from '@scaleo/shared/validators';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

@Component({ template: `` })
export abstract class AbstractProfileFormComponent {
    @Input() statuses: PlatformListsFormatInterface[];

    @Input() roles: PlatformListsFormatInterface[];

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onAddSuccesses: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('replaceManager') replaceManager: TemplateRef<HTMLElement>;

    @ViewChild('replaceManagerFooter') replaceManagerFooter: TemplateRef<HTMLElement>;

    @ViewChild(AddContactComponent) addContactComponent: AddContactComponent;

    form: FormGroup;

    managerImage: string;

    managers: ShortResponseInterface[];

    // apiStatus: ProfileApiStatusType;

    apiLink = 'https://developers.scaleo.io/#31b62b58-5404-4c4c-8114-b6ea9bc405f9';

    changePasswordVisible: boolean;

    // private apiStatusWasChanged: boolean;

    protected constructor(
        // protected platformListsService: PlatformListsService,
        protected newProfileService: NewProfileService,
        protected toastr: ToastrBarService,
        protected formBuilder: FormBuilder
    ) {}

    changeImage(logo: string): void {
        this.managerImage = logo;
    }

    deleteImage(): void {
        this.newProfileService
            .deleteImage()
            .pipe(take(1))
            .subscribe(() => {
                this.managerImage = '';
            });
    }

    protected removePasswordOnFormControll(): void {
        this.form.removeControl('password');
        this.form.removeControl('password_repeat');
    }

    protected addPasswordFieldToFormControll(): void {
        this.form.addControl('password', new FormControl(null, [Validators.required, Validators.minLength(8)]));
        this.form.addControl('password_repeat', new FormControl(null, [Validators.required]));
    }

    changePassword(): void {
        if (!this.changePasswordVisible) {
            this.changePasswordVisible = true;
            this.addPasswordFieldToFormControll();
            this.form.setValidators([checkRepeatPassword(), checkPassword()]);
        } else {
            this.changePasswordVisible = false;
            this.removePasswordOnFormControll();
            this.form.setValidators(null);
        }
    }

    protected initForm(additionalField: BaseObjectModel): void {
        this.form = this.formBuilder.group({
            ...additionalField,
            email: [{ value: '', disabled: false }, [Validators.required, CustomValidators.email]],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: [null, [Validators.required, Validators.minLength(8)]],
            password_repeat: [null, [Validators.required]],
            contacts: this.formBuilder.array([]),
            phone: [''],
            api_status: [PROFILE_API_STATUS.disabled],
            active_managers: [''],
            number_format_id: [],
            date_format_id: [],
            timezone: [],
            // eslint-disable-next-line @typescript-eslint/naming-convention
            twoFA_enabled: [BooleanEnum.False]
        });
    }

    public saveFormData(post: ProfileRequestModel): Observable<ProfileRequestModel> {
        post.image_data = Util.checkBase64Image(this.managerImage);
        return this.newProfileService.update(post).pipe(
            catchError((error) => {
                if (/has already been taken/.test(error?.info?.errors?.email?.[0])) {
                    this.form.get('email').setErrors({ emailAlreadyTaken: true });
                    this.form.markAllAsTouched();
                } else {
                    this.toastr.displayValidationMessages(error?.info?.errors);
                }
                return throwError(error);
            }),
            take(1)
        );
    }

    basicLoadRequireField(fields: CustomFieldInterface[], requireFields: number[]): void {
        if (requireFields.length > 0) {
            requireFields.forEach((rf) => {
                const { field_name: fieldName = undefined } = fields?.find((item) => item.id === rf) || {};
                const field = this.form.get(fieldName);
                if (field) {
                    field.setValidators(Validators.required);
                }
            });
        }
    }

    protected initStaticData(profile: ProfileModel): void {
        this.managerImage = profile?.image || undefined;
        this.form.patchValue({
            ...profile,
            api_status: profile?.api_status || PROFILE_API_STATUS.disabled
        });
    }
}
