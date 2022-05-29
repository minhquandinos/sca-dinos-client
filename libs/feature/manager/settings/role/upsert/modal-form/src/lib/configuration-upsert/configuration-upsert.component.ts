import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
    BehaviorSubject,
    catchError,
    debounceTime,
    filter,
    map,
    mergeMap,
    Observable,
    startWith,
    switchMap,
    take,
    tap,
    throwError
} from 'rxjs';

import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    PERMISSION_FORM_CONTROL,
    PERMISSION_FORM_CONTROL_GROUP,
    PERMISSION_FORM_CONTROL_ITEM,
    PermissionFormControlModel,
    PermissionUpsertConfigureGroupModel,
    PermissionUpsertConfigureItemModel,
    PermissionUpsertPayloadOptionsType,
    ROLE_UPSERT_PROVIDER,
    RolePermissionUpsertConfigModel,
    RoleUpsertService
} from '@scaleo/feature-manager-settings-role-upsert-data-access';
import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';
import { BaseRoleUtil, DefaultRoleUtil } from '@scaleo/platform/role/util';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';
import { PlanFeatureService } from '@scaleo/platform-permission-plan-service';
import { ShortEntityNameEnum } from '@scaleo/shared/data-access/short-entity-list';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

import { keyIsRadio } from './configuratin-role.util';

const TRANSLATE = 'settings.roles_permissions.upsert';
const TRANSLATE_TOASTR = `${TRANSLATE}.toastr`;

const titleMap = {
    create: `${TRANSLATE}.add_title`,
    update: `${TRANSLATE}.edit_title`
};

const roleNameMap: BaseObjectModel<'custom' | 'default', string> = {
    custom: `${TRANSLATE_TOASTR}.custom_role`,
    default: `${TRANSLATE_TOASTR}.role`
};

type ToastrType = 'create' | 'update' | 'delete';

const toastrSuccessMap: BaseObjectModel<ToastrType, string> = {
    create: `${TRANSLATE_TOASTR}.created`,
    update: `${TRANSLATE_TOASTR}.updated`,
    delete: `${TRANSLATE_TOASTR}.deleted`
};

@Component({
    selector: 'scaleo-configuration-upsert',
    templateUrl: './configuration-upsert.component.html',
    styleUrls: ['./configuration-upsert.component.scss'],
    providers: [ROLE_UPSERT_PROVIDER, UnsubscribeService]
})
export class ConfigurationUpsertComponent implements OnInit {
    readonly roleEditConfig: RolePermissionUpsertConfigModel;

    readonly baseRole = BASE_ROLE;

    form: FormGroup;

    form2: FormGroup;

    private _title$: BehaviorSubject<string> = new BehaviorSubject<string>(titleMap.create);

    readonly title$ = this._title$.asObservable().pipe(switchMap((key) => this.translate.stream(key)));

    roleConfigure$: Observable<PermissionUpsertConfigureGroupModel[]>;

    readonly permissionFormControl = PERMISSION_FORM_CONTROL;

    readonly planPermissionEnum = PLATFORM_PLAN_FEATURE;

    private readonly _allowedCustomRole$ = this.planPermissionsService.hasFeature$(PLATFORM_PLAN_FEATURE.customRole);

    readonly allowedCustomRole$ = this._allowedCustomRole$;

    readonly isDisabledCustomRole$ = this._allowedCustomRole$.pipe(map((allowed) => !allowed));

    canDeleteRole$: Observable<boolean>;

    loadingConfigure: boolean;

    readonly baseRoleType = ShortEntityNameEnum.BaseRole;

    readonly showFindRole: boolean = false;

    constructor(
        private readonly modal3EditFormRef: Modal3EditFormRef<any, RolePermissionUpsertConfigModel>,
        private readonly translate: TranslateService,
        private readonly fb: FormBuilder,
        private readonly permissionUpsertService: RoleUpsertService,
        private readonly toastr: ToastrBarService,
        private readonly planPermissionsService: PlanFeatureService,
        private readonly modal3Service: Modal3Service
    ) {
        this.roleEditConfig = this.modal3EditFormRef?.config?.data;
        this.showFindRole = !([BASE_ROLE.admin, BASE_ROLE.advertiser, BASE_ROLE.affiliate] as BaseRoleType[]).includes(
            this.roleEditConfig?.base_role
        );
    }

    ngOnInit(): void {
        this.initForm();
        this.roleConfigure$ = this.roleConfigure();
        if (this.roleEditConfig) {
            this._title$.next(titleMap.update);
        }
        this.canDeleteRole$ = this.canDeleteRole();
    }

    save() {
        if (this.form.valid) {
            const payload: PermissionFormControlModel = { ...this.form.getRawValue() };

            const options: PermissionUpsertPayloadOptionsType = {
                allowedCustomRole: this.allowedCustomRole
            };

            const upsert$ = this.editBaseRoleId
                ? this.permissionUpsertService.update({ ...payload, role: this.editDefaultRoleId }, options)
                : this.permissionUpsertService.create(payload);

            upsert$
                .pipe(
                    catchError((error) => {
                        this.toastr.exception();
                        return throwError(error);
                    }),
                    take(1)
                )
                .subscribe(() => {
                    const type: ToastrType = this.editBaseRoleId ? 'update' : 'create';
                    this.toastrSuccessMessage(type);
                    this.modal3EditFormRef.close(null, this.editBaseRoleId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    changeRoleType() {
        const groups = this.form.get(PERMISSION_FORM_CONTROL.groups) as FormArray;

        if (groups.controls.length) {
            groups.clear();
        }
    }

    trackByFn(index: number): number {
        return index;
    }

    get groups(): FormArray {
        return this.form.get('groups') as FormArray;
    }

    get groupsControls(): AbstractControl[] {
        return this.groups.controls;
    }

    get editBaseRoleId(): BaseRoleType | undefined {
        return this.roleEditConfig?.base_role;
    }

    get editDefaultRoleId(): BaseRoleType | string | undefined {
        return this.roleEditConfig?.role;
    }

    delete(): void {
        const modalRef = this.modal3Service.confirm(this.translate.instant('delete.delete_confirm_text'), {
            title: this.translate.instant('delete.delete_confirm_text')
        });

        modalRef.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.permissionUpsertService.delete(this.editDefaultRoleId)),
                catchError((error) => {
                    this.toastr.exception();
                    return throwError(error);
                }),
                take(1)
            )
            .subscribe(() => {
                this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
                this.toastrSuccessMessage('delete');
            });
    }

    private initForm(): void {
        const { title = undefined, base_role = undefined } = this.roleEditConfig || {};
        this.form = this.fb.group({
            [PERMISSION_FORM_CONTROL.title]: [title, Validators.required],
            [PERMISSION_FORM_CONTROL.role]: [base_role, Validators.required],
            [PERMISSION_FORM_CONTROL.groups]: this.fb.array([])
        });

        if (!this.allowedCustomRole || this.isBaseRole) {
            this.form.get(PERMISSION_FORM_CONTROL.role).disable();
        }
    }

    private createGroups(groups: PermissionUpsertConfigureGroupModel[]): void {
        const groupsFormArray = this.form.get(PERMISSION_FORM_CONTROL.groups) as FormArray;

        groups.forEach((group) => {
            const controlGroup = this.fb.group({
                [PERMISSION_FORM_CONTROL_GROUP.items]: this.createItems(group)
            });
            groupsFormArray.push(controlGroup);
        });
    }

    private createItems(group: PermissionUpsertConfigureGroupModel): FormArray {
        const itemsArray = this.fb.array([]);

        if (keyIsRadio(group.key)) {
            const itemGroup = this.fb.group({
                [PERMISSION_FORM_CONTROL_ITEM.group]: group.id,
                [PERMISSION_FORM_CONTROL_ITEM.item]: [group.items.find((el) => el.is_enabled)?.id]
            });

            if (!this.allowedCustomRole || this.isBaseRoleAdmin || this.isBaseRoleManager) {
                itemGroup.disable();
            }

            itemsArray.push(itemGroup);
        } else {
            group.items.forEach((item) => {
                const itemGroup = this.createItem(group, item);

                if (!this.allowedCustomRole || this.isBaseRoleAdmin) {
                    itemGroup.disable();
                }

                itemsArray.push(itemGroup);
            });
        }

        return itemsArray;
    }

    private createItem(group: PermissionUpsertConfigureGroupModel, item: PermissionUpsertConfigureItemModel): FormGroup {
        const formGroup = this.fb.group({
            [PERMISSION_FORM_CONTROL_ITEM.group]: [group.id],
            [PERMISSION_FORM_CONTROL_ITEM.id]: [item.id],
            [PERMISSION_FORM_CONTROL_ITEM.item]: [+item.is_enabled]
        });
        return formGroup;
    }

    private get allowedCustomRole(): boolean {
        return this.planPermissionsService.hasFeature(PLATFORM_PLAN_FEATURE.customRole);
    }

    private get isBaseRole(): boolean {
        return BaseRoleUtil.isBaseRole(this.editBaseRoleId);
    }

    private get isDefaultRole(): boolean {
        return DefaultRoleUtil.isDefaultManagers(this.editDefaultRoleId);
    }

    private get controlRoleValue(): BaseRoleType | undefined {
        return this.form.get(PERMISSION_FORM_CONTROL.role)?.value;
    }

    private get isBaseRoleAdmin(): boolean {
        return this.controlRoleValue === this.baseRole.admin;
    }

    private get isBaseRoleManager(): boolean {
        return this.controlRoleValue === this.baseRole.manager;
    }

    private canDeleteRole(): Observable<boolean> {
        return this.allowedCustomRole$.pipe(
            map((allowed) => {
                return this.editDefaultRoleId && allowed && !DefaultRoleUtil.isDefaultManagers(this.editDefaultRoleId);
            })
        );
    }

    private roleConfigure(): Observable<PermissionUpsertConfigureGroupModel[]> {
        const roleControl = this.form.get(PERMISSION_FORM_CONTROL.role);
        return roleControl.valueChanges.pipe(
            startWith(roleControl.value),
            filter((role) => !!role),
            debounceTime(0),
            tap(() => {
                this.loadingConfigure = true;
            }),
            mergeMap((baseRole) => {
                return this.permissionUpsertService.viewConfigure(this.editDefaultRoleId || baseRole);
            }),
            map((configure) => configure.filter((group) => group?.items?.length > 0)),
            tap((configure) => {
                this.createGroups(configure);
                this.loadingConfigure = false;
            })
        );
    }

    private get toastrRoleName(): string {
        const role = this.isDefaultRole ? roleNameMap['default'] : roleNameMap['custom'];
        if (role) {
            return this.translate.instant(role);
        }
        return undefined;
    }

    private toastrSuccessMessage(type: ToastrType): void {
        const roleName = this.toastrRoleName;
        const message = toastrSuccessMap?.[type];

        if (message) {
            this.toastr.successes(this.translate.instant(message, { roleName }));
        }
    }
}
