import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { DefaultManagerService } from '@scaleo/account/service';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    AdvertiserFormControlModel,
    AdvertiserModel,
    AdvertiserUpsertService,
    MANAGER_ADVERTISER_UPSERT_PROVIDER
} from '@scaleo/feature/manager/advertiser/upsert/data-access';
import { PlatformListsService, PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { AddContactComponent } from '@scaleo/shared/components/contact';
import { ConfigCustomFieldService, CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { checkPassword, checkRepeatPassword, CustomValidators } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

@Component({
    selector: 'scaleo-mng-advertiser-create',
    templateUrl: './advertiser-create.component.html',
    providers: [
        ConfigCustomFieldService,
        { provide: 'CUSTOM_FIELDS_CONFIG', useValue: 'adv_custom_fields' },
        UnsubscribeService,
        MANAGER_ADVERTISER_UPSERT_PROVIDER,
        DefaultManagerService
    ]
})
export class AdvertiserCreateComponent implements OnInit {
    readonly editId: number;

    form: FormGroup;

    logo: string;

    changePasswordVisible: boolean;

    advertiserData: AdvertiserModel | any;

    isLoad = false;

    readonly apiLink: string = 'https://developers.scaleo.io/#9eebf88d-d1d5-4af4-a051-0752d087caeb';

    @ViewChild(AddContactComponent) addContactComponent: AddContactComponent;

    advertiserTokenPostback = this.platformSettingsQuery.settings.advertiser_token_for_postback;

    constructor(
        private readonly customFieldService: ConfigCustomFieldService,
        private readonly modal3Service: Modal3Service,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private readonly formBuilder: FormBuilder,
        private readonly platformListsService: PlatformListsService,
        private readonly translate: TranslateService,
        private readonly toastr: ToastrBarService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly advertiserUpsertService: AdvertiserUpsertService,
        private readonly profileQuery: ProfileQuery,
        private readonly defaultManagerService: DefaultManagerService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        this.editId = this.modal3EditFormRef.config.data?.editId;
    }

    ngOnInit(): void {
        this.initForm();

        if (this.editId) {
            this.loadFormData();
            this.removePassordOnFormControll();
        } else {
            this.setManagerId();
            this.isLoad = true;
            this.form.setValidators([checkRepeatPassword(), checkPassword()]);
        }
    }

    public add(): void {
        if (
            this.form.get('firstname').value &&
            this.form.get('lastname').value &&
            this.form.get('company_name').value === '' &&
            !this.editId
        ) {
            this.form.patchValue({
                company_name: `${this.form.value.firstname} ${this.form.value.lastname}`
            });
        }

        if (this.form.valid) {
            const post: AdvertiserFormControlModel = { ...this.form.getRawValue() };
            post.custom_fields = this.customFieldService.convertCustomFieldsToString(this.form.value.custom_fields);

            if (this.addContactComponent) {
                post.contacts = this.addContactComponent.removeEmptyContacts();
            }

            post.image_data = Util.checkBase64Image(this.logo);

            Object.keys(post).forEach((field) => (post as any)[field] === null && delete (post as any)[field]);
            const addUpdate = this.editId
                ? this.advertiserUpsertService.update(this.editId, post)
                : this.advertiserUpsertService.create(post);

            addUpdate
                .pipe(
                    catchError((error) => {
                        if (/has already been taken/.test(error?.info?.errors?.email?.[0])) {
                            this.form.get('email').setErrors({ emailAlreadyTaken: true });
                            this.form.markAllAsTouched();
                        } else {
                            this.toastr.displayValidationMessages(error?.info?.errors);
                        }
                        return throwError(error);
                    }),
                    takeUntil(this.unsubscribe)
                )
                .subscribe(() => {
                    this.form.reset();
                    this.modal3EditFormRef.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);
                    this.toastr.successes(
                        this.translate.instant(this.editId ? 'advertiser.basic.advertiser_edited' : 'advertiser.basic.advertiser_created')
                    );
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    public changePassword(): void {
        if (!this.changePasswordVisible) {
            this.changePasswordVisible = true;
            this.addPasswordFieldToFormControll();
            this.form.setValidators([checkRepeatPassword(), checkPassword()]);
        } else {
            this.changePasswordVisible = false;
            this.removePassordOnFormControll();
            this.form.setValidators(null);
        }
    }

    // public refreshApi(): void {
    //     this.toastr.successes(this.translate.instant('notifications.refresh_api'));
    // }

    public deleteImage(): void {
        this.advertiserUpsertService
            .deleteImage(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                this.logo = '';
            });
    }

    public changeImage(logo: string): void {
        this.logo = logo;
    }

    public get customFieldsConfig(): CustomFieldInterface[] {
        return this.customFieldService.customFieldsConfig;
    }

    public delete(): void {
        const ref$ = this.modal3Service.confirm(this.translate.instant('advertiser.basic.delete_confirm_text'), {
            title: this.translate.instant('advertiser.basic.delete_confirm_title')
        });

        ref$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.advertiserUpsertService.delete(this.editId)),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.toastr.successes(this.translate.instant('advertiser.basic.deleted'));
                this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
            });
    }

    private setManagerId(): void {
        const defaultManager: number = this.defaultManagerService.id;
        if (defaultManager) {
            this.form.patchValue({
                managers: [defaultManager]
            });
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            company_name: ['', Validators.required],
            image_data: [null],
            status: [PlatformListsStatusesEnum.Active, Validators.required],
            email: [{ value: '', disabled: false }, [Validators.required, CustomValidators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]],
            password_repeat: [null, [Validators.required]],
            firstname: [null, Validators.required],
            lastname: [null, Validators.required],
            phone: [null],
            contacts: this.formBuilder.array([]),
            address: [''],
            city: [''],
            region: [''],
            country: [null],
            postal_code: [''],
            payment_details: [null],
            traffic_types: [null],
            tags: [null],
            notes: [null],
            managers: [null],
            custom_fields: this.customFieldService.createCustomFieldsGroup(false),
            api_status: [2],
            // eslint-disable-next-line @typescript-eslint/naming-convention
            twoFA_enabled: this.platformSettingsQuery.settings.twoFA_advertiser
        });

        if (this.editId && this.advertiserTokenPostback) {
            this.form.addControl('require_postback_token', this.formBuilder.control('BooleanEnum.True'));
        }
    }

    private removePassordOnFormControll(): void {
        this.form.removeControl('password');
        this.form.removeControl('password_repeat');
    }

    private addPasswordFieldToFormControll(): void {
        this.form.addControl('password', new FormControl(null, [Validators.required, Validators.minLength(8)]));
        this.form.addControl('password_repeat', new FormControl(null, [Validators.required]));
    }

    private loadFormData(): void {
        this.advertiserUpsertService
            .view(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((advertiser) => {
                this.advertiserData = advertiser;

                this.form.patchValue({
                    ...this.advertiserData,
                    managers: advertiser.managers_assigned ? advertiser.managers_assigned.map((manager) => +manager.id) : null,
                    tags: advertiser.tags ? advertiser.tags_selected.map((tag) => tag.id) : null
                });

                if (advertiser.image) {
                    this.logo = advertiser.image;
                }

                this.isLoad = true;
            });
    }
}
