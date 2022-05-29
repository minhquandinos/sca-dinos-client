import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, filter, Subject, take, throwError } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { DefaultManagerService } from '@scaleo/account/service';
import {
    AFFILIATE_UPSERT_PROVIDER,
    AffiliateUpsertModel,
    AffiliateUpsertService
} from '@scaleo/feature/manager/affiliate/upsert/data-access';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { AddContactComponent } from '@scaleo/shared/components/contact';
import { ConfigCustomFieldService, CustomFieldInterface } from '@scaleo/shared/data-access/custom-fields';
import { checkPassword, checkRepeatPassword, CustomValidators } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

@Component({
    selector: 'scaleo-affiliate-create',
    templateUrl: './affiliate-create.component.html',
    providers: [
        AFFILIATE_UPSERT_PROVIDER,
        ConfigCustomFieldService,
        { provide: 'CUSTOM_FIELDS_CONFIG', useValue: 'aff_custom_fields' },
        DefaultManagerService
    ]
})
export class AffiliateCreateComponent implements OnInit, OnDestroy {
    readonly editId: number;

    @Input() managers: any;

    accountType = 1;

    public affiliateLogo: string;

    public form: FormGroup;

    public changePasswordVisible = false;

    public affiliateData: AffiliateUpsertModel;

    public isLoad = false;

    showCustomFields = false;

    public apiLink = 'https://developers.scaleo.io/#98193d9b-0d18-4c7d-8952-e8bfb6a8554f';

    @ViewChild(AddContactComponent) addContactComponent: AddContactComponent;

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private readonly modal3Service: Modal3Service,
        private readonly router: Router,
        private readonly affiliateUpsertService: AffiliateUpsertService,
        private readonly translate: TranslateService,
        private readonly formBuilder: FormBuilder,
        public readonly customFieldService: ConfigCustomFieldService,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private readonly profileQuery: ProfileQuery,
        private readonly toastr: ToastrBarService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly defaultManagerService: DefaultManagerService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        this.editId = this.modal3EditFormRef.config.data?.editId;
    }

    ngOnInit(): void {
        this.initForm();
        if (this.editId) {
            this.getAffiliateDetails();
        } else {
            this.setManagerId();
            this.showCustomFields = true;
            this.form.setValidators([checkRepeatPassword(), checkPassword()]);
            this.isLoad = true;
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    add(): void {
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
            const post = { ...this.form.getRawValue() };
            post.account_type = this.accountType;
            post.custom_fields = this.customFieldService.convertCustomFieldsToString(this.form.value.custom_fields);

            if (this.addContactComponent) {
                post.contacts = this.addContactComponent.removeEmptyContacts();
            }

            post.image_data = Util.checkBase64Image(this.affiliateLogo);

            const addUpdate = this.editId
                ? this.affiliateUpsertService.update(this.editId, post)
                : this.affiliateUpsertService.create(post);

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
                .subscribe((affiliate) => {
                    this.form.reset();
                    this.modal3EditFormRef.close(affiliate, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);
                    this.toastr.successes(
                        this.translate.instant(this.editId ? 'affiliate.basic.affiliate_edited' : 'affiliate.basic.affiliate_created')
                    );
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    changeImage(logo: string): void {
        this.affiliateLogo = logo;
    }

    deleteImage(): void {
        this.affiliateUpsertService
            .deleteImage(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                this.affiliateLogo = '';
            });
    }

    get customFieldsConfig(): CustomFieldInterface[] {
        return this.customFieldService.customFieldsConfig;
    }

    delete(): void {
        const modal$ = this.modal3Service.confirm(this.translate.instant('offers_page.basic.delete_confirm_text'), {
            title: this.translate.instant('offers_page.basic.delete_confirm_title')
        });
        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.affiliateUpsertService.delete(this.editId)),
                take(1)
            )
            .subscribe(() => {
                this.toastr.successes(this.translate.instant('affiliate.basic.deleted'));
                this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
            });
    }

    changePassword(): void {
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

    private loadForm(affiliate: AffiliateUpsertModel): void {
        this.form.patchValue({
            ...affiliate,
            managers: affiliate.managers_assigned,
            tags: affiliate.tags_selected,
            traffic_types: affiliate.traffic_types_selected,
            contacts: []
        });

        this.accountType = affiliate.account_type;

        this.removePassordOnFormControll();

        if (affiliate.image) {
            this.affiliateLogo = affiliate.image;
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

    private getAffiliateDetails(): void {
        this.affiliateUpsertService
            .view(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((affiliate) => {
                this.affiliateData = affiliate;
                this.isLoad = true;
                this.showCustomFields = true;
                this.loadForm(this.affiliateData);
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
        // TODO refactor this component, created dynamic control for referral and so more
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
            traffic_types: [null],
            tags: [null],
            internal_notes: [null],
            managers: [null],
            custom_fields: this.customFieldService.createCustomFieldsGroup(false),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            twoFA_enabled: this.platformSettingsQuery.settings.twoFA_affiliate
        });
    }
}
