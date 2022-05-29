import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';

import { BaseIdTitleModel } from '@scaleo/core/data';
import {
    OFFER_AFFILIATE_ACCESS_EDIT_PROVIDER,
    OfferAffiliateAccessEditService,
    OfferAffiliateAccessFormControlModel
} from '@scaleo/feature/manager/offer/affiliate-access/update/data-access';
import { OfferAffiliateAccessModel } from '@scaleo/feature/manager/offer/affiliate-access/widget/data-access';
import { AffiliateVisibilityIdEnum, OffersVisibilityIdEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { MultiSelectDataConfigModel } from '@scaleo/shared/components2/multi-select-block';
import { ShortEntityNameEnum } from '@scaleo/shared/data-access/short-entity-list';
import { Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-offer-affiliate-access-edit',
    templateUrl: './offer-affiliate-access-edit.component.html',
    providers: [OFFER_AFFILIATE_ACCESS_EDIT_PROVIDER]
})
export class OfferAffiliateAccessEditComponent implements OnInit {
    form: FormGroup;

    showAllowed$: Observable<boolean>;

    showDenied$: Observable<boolean>;

    displayApprovalQuestionsBlock$: Observable<boolean>;

    private readonly _data: OfferAffiliateAccessModel;

    readonly initDeniedItems: BaseIdTitleModel[] = [];

    readonly initAllowedItems: BaseIdTitleModel[] = [];

    readonly multiSelectDataConfig: MultiSelectDataConfigModel = {
        serviceName: ShortEntityNameEnum.Affiliates,
        queryParams: {
            perPage: 20,
            page: 1,
            sortField: 'id',
            sortDirection: 'asc'
        }
    };

    readonly affiliateVisibilityIdEnum = AffiliateVisibilityIdEnum;

    constructor(
        private readonly editFormRef: Modal3EditFormRef<any, OfferAffiliateAccessModel>,
        private readonly formBuilder: FormBuilder,
        private readonly offerAffiliateAccessEditService: OfferAffiliateAccessEditService,
        private readonly toastr: ToastrBarService,
        private readonly checkPermissionService: CheckPermissionService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly cdr: ChangeDetectorRef,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {
        this._data = editFormRef.config.data;
        this.initAllowedItems = this._data.allowed_affiliates;
        this.initDeniedItems = this._data.denied_affiliates;
    }

    ngOnInit(): void {
        this.initForm();
        this.changeValidatorForApprovalQuestion();
        this.displayApprovalQuestionsBlock$ = this.getDisplayApprovalQuestionsBlock$;

        const visibility$: Observable<AffiliateVisibilityIdEnum> = this.visibilityControl.valueChanges.pipe(
            startWith(this.visibilityControlValue as AffiliateVisibilityIdEnum)
        );

        this.showAllowed$ = visibility$.pipe(
            map((value) => [AffiliateVisibilityIdEnum.RequireApproval, AffiliateVisibilityIdEnum.Private].includes(value))
        );
        this.showDenied$ = visibility$.pipe(
            map((value) => [AffiliateVisibilityIdEnum.RequireApproval, AffiliateVisibilityIdEnum.Public].includes(value))
        );
    }

    save(): void {
        if (this.form.valid) {
            this.offerAffiliateAccessEditService
                .update(this.formValue)
                .pipe(
                    tap((response) => {
                        this.editFormRef.close(response);
                    })
                )
                .toPromise()
                .then(
                    () => {
                        this.toastr.successResponse('offers_page.affiliate.save');
                    },
                    () => {
                        this.toastr.response(ToastrBarEventEnum.ExceptionUpdated, 'offers_page.affiliate.title');
                    }
                );
        } else {
            this.form.markAllAsTouched();
        }
    }

    changeAffiliateVisibility({ newValue }: SelectChangeModel): void {
        if (newValue === AffiliateVisibilityIdEnum.Public) {
            this.form.patchValue({
                allowed_affiliates: []
            });
        }

        if (newValue === AffiliateVisibilityIdEnum.Private) {
            this.form.patchValue({
                denied_affiliates: []
            });
        }

        this.changeValidatorForApprovalQuestion();

        setTimeout(() => {
            this.cdr.detectChanges();
        }, 1000);
    }

    changeAskApprovalQuestions(): void {
        const questionsControl = this.form.get('questions');
        if (!questionsControl.value) {
            questionsControl.patchValue(this.platformSettingsQuery.settings.approval_questions_for_affiliate);
        }
        this.changeValidatorForApprovalQuestion();
    }

    private changeValidatorForApprovalQuestion(): void {
        if (this.canChangeVisibleTypeAndQA) {
            const approvalQuestionsControl = this.form.get('questions');
            const { ask_approval_questions, visible_type } = this.form.value;
            if (ask_approval_questions && visible_type === AffiliateVisibilityIdEnum.RequireApproval) {
                approvalQuestionsControl.setValidators([Validators.required]);
            } else {
                approvalQuestionsControl.clearValidators();
            }
            approvalQuestionsControl.updateValueAndValidity();
        }
    }

    private get visibilityControlValue(): AffiliateVisibilityIdEnum {
        return this.visibilityControl.value;
    }

    private get visibilityControl(): AbstractControl {
        return this.form.get('visible_type');
    }

    private initForm(): void {
        const { visible_type, allowed_affiliates, denied_affiliates, questions, ask_approval_questions } = this._data;
        this.form = this.formBuilder.group({
            visible_type: [visible_type, Validators.required],
            allowed_affiliates: [allowed_affiliates.map((elem) => elem.id)],
            denied_affiliates: [denied_affiliates.map((elem) => elem.id)]
        });

        const { ask_approval_questions_by_default: enabledSettingsQuestion, approval_questions_for_affiliate: settingsQuestion } =
            this.platformSettingsQuery.settings;

        if (this.canChangeVisibleTypeAndQA && enabledSettingsQuestion) {
            const enabledQuestions = ask_approval_questions;
            const questionsValue = questions || settingsQuestion;
            this.form.addControl('ask_approval_questions', this.formBuilder.control(enabledQuestions));
            this.form.addControl('questions', this.formBuilder.control(questionsValue));
        }

        if (!this.canChangeVisibleTypeAndQA) {
            this.form.get('visible_type').disable();
        }
    }

    private get formValue(): OfferAffiliateAccessFormControlModel {
        return this.form.value;
    }

    private get canChangeVisibleTypeAndQA(): boolean {
        return this.checkPermissionService.check(this.permissions.canAddEditDeleteOffers);
    }

    private get getDisplayApprovalQuestionsBlock$(): Observable<boolean> {
        const visibilityControl = this.form.get('visible_type');
        return this.visibilityControl.valueChanges.pipe(
            startWith(visibilityControl.value as OffersVisibilityIdEnum),
            filter(() => this.canChangeVisibleTypeAndQA),
            map((visibility: OffersVisibilityIdEnum) => visibility === OffersVisibilityIdEnum.Require)
        );
    }
}
