import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, EMPTY, filter, Observable, throwError } from 'rxjs';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';

import { PROFILE_API_STATUS, ProfileApiStatusType } from '@scaleo/account/common';
import { NewProfileService, ProfileQuery } from '@scaleo/account/data-access';
import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    TEAMMATE_UPSERT_PROVIDER,
    TeammateUpsertPayloadDto,
    TeammateUpsertService,
    TeammateUpsertViewModel
} from '@scaleo/feature/manager/settings/teammate/upsert/data-access';
import { BaseStatusIdEnum, PlatformListsStatusesEnum, PlatformListsStatusesNameEnum } from '@scaleo/platform/list/access-data';
import { BASE_ROLE, BaseRoleType, DefaultRoleEnum } from '@scaleo/platform/role/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { AddContactComponent } from '@scaleo/shared/components/contact';
import { ShortManagerQueryParamDto, ShortRoleModel } from '@scaleo/shared/data-access/short-entity-list';
import { checkPassword, checkRepeatPassword, CustomValidators } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Ref, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

@Component({
    selector: 'app-manager-create',
    templateUrl: './manager-create.component.html',
    providers: [UnsubscribeService, TEAMMATE_UPSERT_PROVIDER]
})
export class ManagerCreateComponent implements OnInit {
    readonly editId: number;

    form: FormGroup;

    formManager: FormGroup;

    readonly exceptStatusIds: number[] = [BaseStatusIdEnum.Pending];

    public managerImage: string;

    public confirm: string;

    public currentsUser: boolean;

    public managerData: TeammateUpsertViewModel;

    public changePasswordVisible: boolean;

    public apiStatus: ProfileApiStatusType;

    public apiLink = 'https://developers.scaleo.io/#31b62b58-5404-4c4c-8114-b6ea9bc405f9';

    private _choiceRole$: BehaviorSubject<BaseRoleType> = new BehaviorSubject<BaseRoleType>(BASE_ROLE.admin);

    readonly currentRole$: Observable<BaseRoleType> = this._choiceRole$.asObservable();

    excludeRoleQueryParams: ShortManagerQueryParamDto;

    @ViewChild('replaceManager') replaceManager: TemplateRef<HTMLElement>;

    @ViewChild('replaceManagerFooter') replaceManagerFooter: TemplateRef<HTMLElement>;

    @ViewChild(AddContactComponent) addContactComponent: AddContactComponent;

    private deleteManagerModal3Ref: Modal3Ref;

    isLoad: boolean;

    constructor(
        private modal3Service: Modal3Service,
        private modal3EditFormRef: Modal3EditFormRef,
        private formBuilder: FormBuilder,
        private teammateUpsertService: TeammateUpsertService,
        private translate: TranslateService,
        private profileQuery: ProfileQuery,
        private toastr: ToastrBarService,
        private unsubscribe: UnsubscribeService,
        private readonly newProfileService: NewProfileService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly cdr: ChangeDetectorRef
    ) {
        this.editId = this.modal3EditFormRef.config?.data?.editId || undefined;
        if (!this.editId) {
            this.isLoad = true;
        }
    }

    ngOnInit(): void {
        this.initForm();

        if (this.editId) {
            this.currentsUser = this.editId === this.profileQuery.profile.id;
            this.loadFormData();
            this.removePasswordOnFormControll();
        } else {
            this.form.setValidators([checkRepeatPassword(), checkPassword()]);
        }
    }

    public save(): void {
        if (this.form.valid) {
            this.saveFormData();
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
            this.removePasswordOnFormControll();
            this.form.setValidators(null);
        }
    }

    public changeImage(logo: string): void {
        this.managerImage = logo;
    }

    public deleteImage(): void {
        this.teammateUpsertService
            .deleteImage(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => {
                this.managerImage = '';
            });
    }

    public refreshApi(): void {
        this.teammateUpsertService
            .updateApiKey(this.editId, this.form.getRawValue().role)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((apiKey: string) => {
                this.managerData.api_key = apiKey;
                this.toastr.successes(this.translate.instant('notifications.refresh_api'));
            });
    }

    public loadSceleton(): boolean {
        if (!this.editId) {
            return true;
        }

        return !!(this.editId && this.managerData);
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            email: [{ value: '', disabled: false }, [Validators.required, CustomValidators.email]],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: [null, [Validators.required, Validators.minLength(8)]],
            password_repeat: [null, [Validators.required]],
            contacts: this.formBuilder.array([]),
            phone: [''],
            status: [PlatformListsStatusesEnum.Active, Validators.required],
            role: [DefaultRoleEnum.Admin, Validators.required],
            api_status: [PROFILE_API_STATUS.disabled],
            active_managers: [''],
            number_format_id: [],
            date_format_id: [],
            timezone: [],
            show_email_for_users: BooleanEnum.True,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            twoFA_enabled: this.platformSettingsQuery.settings.twoFA_manager
        });
    }

    private removePasswordOnFormControll(): void {
        this.form.removeControl('password');
        this.form.removeControl('password_repeat');
    }

    private addPasswordFieldToFormControll(): void {
        this.form.addControl('password', new FormControl(null, [Validators.required, Validators.minLength(8)]));
        this.form.addControl('password_repeat', new FormControl(null, [Validators.required]));
    }

    private loadFormData(): void {
        this.teammateUpsertService
            .view(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((manager) => {
                this.managerData = manager;

                const { api_status, image, role } = manager;

                this.form.patchValue({
                    ...this.managerData
                });

                this.apiStatus = api_status;

                this.managerImage = image;

                this.setExcludeRoleQueryParams(role);
                this.isLoad = true;
            });
    }

    private saveFormData(): void {
        const { status, active_managers } = this.form.value;
        if (
            this.editId &&
            +status === PlatformListsStatusesEnum.Inactive &&
            !active_managers &&
            this.managerData.status !== PlatformListsStatusesEnum.Inactive
        ) {
            this.openInActiveDeleteManagerModal('update_manager');
            return;
        }

        this.addUpdate$()
            .pipe(
                debounceTime(500),
                catchError((error) => {
                    this.errorAddUpdate(error);
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.successesAddUpdate();
            });
    }

    private get transformFormValue(): TeammateUpsertPayloadDto {
        const post: TeammateUpsertPayloadDto = {
            ...this.form.getRawValue(),
            contacts: this.addContactComponent.removeEmptyContacts()
        };

        post.image_data = Util.checkBase64Image(this.managerImage);
        return post;
    }

    private addUpdate$(): Observable<TeammateUpsertViewModel> {
        return this.editId
            ? this.teammateUpsertService
                  .update(this.editId, this.transformFormValue)
                  .pipe(tap((): any => this.updateTwoFAForCurrentManager()))
            : this.teammateUpsertService.create(this.transformFormValue);
    }

    private successesAddUpdate(): void {
        const translate = this.translate.instant(
            `administration_settings.managers.basic.${this.editId ? 'edited' : 'created'}_notification`
        );
        this.toastr.successes(translate);
        this.modal3EditFormRef.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);
    }

    private errorAddUpdate(error: any): void {
        if (/has already been taken/.test(error?.info?.errors?.email?.[0])) {
            this.form.get('email').setErrors({ emailAlreadyTaken: true });
            this.form.markAllAsTouched();
        } else {
            this.toastr.displayValidationMessages(error?.info?.errors);
        }
    }

    openInActiveDeleteManagerModal(action: string): void {
        this.initFormManager();

        this.confirm = action;

        const modal$ = (this.deleteManagerModal3Ref = this.modal3Service.info(this.replaceManager, {
            title: this.translate.instant(`${action}.title`),
            footer: {
                template: this.replaceManagerFooter
            }
        }));

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Update),
                switchMap(({ data }) => {
                    if (action === 'update_manager') {
                        this.form.patchValue({
                            active_managers: data
                        });
                        return this.teammateUpsertService.update(this.editId, this.transformFormValue);
                    }

                    if (action === 'delete_manager') {
                        return this.teammateUpsertService.delete(this.editId, data);
                    }

                    return EMPTY;
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.successesAddUpdate();
                if (action === 'update_manager' || action === 'delete_manager') {
                    this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Update);
                }
            });
    }

    initFormManager(): void {
        this.formManager = this.formBuilder.group({
            new_managers: [null, Validators.required]
        });
    }

    update(): void {
        if (this.formManager.valid) {
            const idsNewManager: string = this.formManager.value.new_managers.join(',');
            this.deleteManagerModal3Ref.close(idsNewManager, Modal3CloseEventEnum.Update);
        } else {
            this.formManager.markAllAsTouched();
        }
    }

    cancel(): void {
        this.deleteManagerModal3Ref.close(null, Modal3CloseEventEnum.Cancel);
    }

    private updateTwoFAForCurrentManager(): void {
        if (this.currentsUser) {
            this.newProfileService.updateStoreKey('twoFA_enabled', this.form.value.twoFA_enabled);
        }
    }

    private setExcludeRoleQueryParams(role: DefaultRoleEnum): void {
        const advertiserOrAffiliateManager = [DefaultRoleEnum.AdvertiserManager, DefaultRoleEnum.AffiliateManager].includes(
            role as DefaultRoleEnum
        );

        this.excludeRoleQueryParams = { status: PlatformListsStatusesNameEnum.Active };

        if (advertiserOrAffiliateManager) {
            const excludeRole =
                role === DefaultRoleEnum.AdvertiserManager ? DefaultRoleEnum.AffiliateManager : DefaultRoleEnum.AdvertiserManager;
            this.excludeRoleQueryParams = { ...this.excludeRoleQueryParams, exclude_role: excludeRole };
        }
    }

    changeRole({ base_role = undefined }: ShortRoleModel): void {
        if (base_role) {
            this._choiceRole$.next(base_role);
            this.cdr.detectChanges();
        }
    }
}
