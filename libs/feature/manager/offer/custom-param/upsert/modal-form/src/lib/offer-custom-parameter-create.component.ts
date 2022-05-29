import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { defer, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    OfferCustomParametersConditionsModel,
    OfferCustomParametersParametersModel,
    OfferCustomParamListModel
} from '@scaleo/feature/manager/offer/custom-param/common';
import {
    OFFER_CUSTOM_PARAMETER_UPSERT_PROVIDER,
    OfferCustomParameterCreateService
} from '@scaleo/feature/manager/offer/custom-param/upsert/data-access';
import { DateUtil } from '@scaleo/platform/date/util';
import { BaseStatusIdEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

import { OfferCustomAddFieldUtil } from './utils/offer-custom-add-field.util';

const CUSTOM_PARAMETER_TRANSLATE_SCHEMA = 'offers_page.custom_parameters.form.parameters.title';

@Component({
    selector: 'app-offer-custom-parameter-create',
    templateUrl: './offer-custom-parameter-create.component.html',
    providers: [UnsubscribeService, OFFER_CUSTOM_PARAMETER_UPSERT_PROVIDER, OfferCustomAddFieldUtil]
})
export class OfferCustomParameterCreateComponent implements OnInit {
    readonly id: number;

    readonly title: string;

    readonly buttonLabel: string;

    isLoad: boolean;

    form: FormGroup;

    hideShowUpdateDeleteButton = false;

    constructor(
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        private readonly _formBuilder: FormBuilder,
        private readonly _service: OfferCustomParameterCreateService,
        private readonly _translate: TranslateService,
        private readonly _offerCustomAddFieldHelper: OfferCustomAddFieldUtil,
        private readonly _checkPermissionService: CheckPermissionService,
        private readonly _toastr: ToastrBarService,
        private readonly _unsubscribe: UnsubscribeService,
        private readonly _modal3Ref: Modal3EditFormRef,
        private readonly _modal3: Modal3Service
    ) {
        this.id = this._modal3Ref.config.data.id;
        this.title = this._getTitle;
        this.buttonLabel = this._getButtonLabel;
    }

    ngOnInit(): void {
        this._initForm();
        if (this.id) {
            this._loadFormData();
        } else {
            this.isLoad = true;
        }
    }

    add() {
        if (this.form.valid) {
            defer(() => (this.id ? this._update$ : this._create$))
                .toPromise()
                .then();
        } else {
            this.form.markAllAsTouched();
        }
    }

    delete(): void {
        const content = this._translate.instant('delete.delete_confirm_text');
        this._modal3
            .confirm(content, { title: 'delete.delete_confirm_title', typeButton: 'delete' })
            .afterClosed$.pipe(switchMap(({ type }) => (type === Modal3CloseEventEnum.Confirm ? this._delete$ : EMPTY)))
            .toPromise()
            .then();
    }

    private get _getTitle(): string {
        const path = 'offers_page.custom_parameters.form';
        const translate = this._translate.instant(this.id ? `${path}.edit_title` : `${path}.add_title`);
        return this.id ? `${translate} #${this.id}` : translate;
    }

    private get _getButtonLabel(): string {
        const translateSchema = this.id ? 'shared.dictionary.save' : 'shared.dictionary.add';
        return this._translate.instant(translateSchema);
    }

    private _initForm() {
        this.form = this._formBuilder.group({
            status: BaseStatusIdEnum.Active,
            affiliates: undefined,
            start_date: [DateUtil.makeDate(DateUtil.now()), Validators.required],
            end_date: '',
            conditions: this._formBuilder.array([]),
            parameters: this._formBuilder.array([])
        });

        if (this._checkPermissionService.check([this.permissions.affManagerOnly, this.permissions.visibilityAssignedUsers], 'every')) {
            this.form.get('affiliates').setValidators(Validators.required);
        }

        if (!this.id) {
            (this.form.get('parameters') as FormArray).push(this._offerCustomAddFieldHelper.addParameter());
        }
    }

    private _loadFormData() {
        this._service
            .view(this.id)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe((response: OfferCustomParamListModel) => {
                const { parameters, conditions, affiliates } = response;
                this._loadParameters(parameters);
                this._loadConditions(conditions);

                this.form.patchValue({
                    ...response,
                    affiliates: ArrayUtil.pickByKey(affiliates, 'id')
                });
                this.hideShowUpdateDeleteButton = this._getHideShowUpdateDeleteButton;
                this.isLoad = true;
            });
    }

    private _loadParameters(parameters: OfferCustomParametersParametersModel[]) {
        parameters.forEach((param) => {
            (this.form.get('parameters') as FormArray).push(this._offerCustomAddFieldHelper.addParameter(param));
        });
    }

    private _loadConditions(conditions: OfferCustomParametersConditionsModel[]) {
        conditions.forEach((param) => {
            (this.form.get('conditions') as FormArray).push(this._offerCustomAddFieldHelper.addCondition(param));
        });
    }

    private get _getHideShowUpdateDeleteButton(): boolean {
        return this.id && this.form.value.affiliates_mixed;
    }

    private get _create$(): Observable<OfferCustomParamListModel> {
        return this._service.create(this.form.value).pipe(
            tap((response) => {
                this._toastr.response(ToastrBarEventEnum.Custom, 'offers_page.custom_parameters.created', 'success');
                this._modal3Ref.close(response, Modal3CloseEventEnum.Create);
            }),
            catchError((err) => {
                this._toastr.response(ToastrBarEventEnum.ExceptionCreated, CUSTOM_PARAMETER_TRANSLATE_SCHEMA);
                return throwError(err);
            })
        );
    }

    private get _update$(): Observable<OfferCustomParamListModel> {
        return this._service.update(this.id, this.form.value).pipe(
            tap((response) => {
                this._toastr.response(ToastrBarEventEnum.Custom, 'offers_page.custom_parameters.edited', 'success');
                this._modal3Ref.close(response, Modal3CloseEventEnum.Update);
            }),
            catchError((err) => {
                this._toastr.response(ToastrBarEventEnum.ExceptionUpdated, CUSTOM_PARAMETER_TRANSLATE_SCHEMA);
                return throwError(err);
            })
        );
    }

    private get _delete$(): Observable<void> {
        return this._service.delete(this.id).pipe(
            tap(() => {
                this._modal3Ref.close({ id: this.id }, Modal3CloseEventEnum.Delete);
                this._toastr.response(ToastrBarEventEnum.Custom, 'offers_page.custom_parameters.deleted', 'success');
            }),
            catchError((err) => {
                this._toastr.response(ToastrBarEventEnum.ExceptionDeleted, CUSTOM_PARAMETER_TRANSLATE_SCHEMA);
                return throwError(err);
            })
        );
    }
}
