import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { PostbackLevelsEnums, PostbacksService, PostbackTypesEnums } from '@scaleo/affiliate/postback/list/data-access';
import {
    ManagerAffiliatePostbackUpsertPayloadModel,
    POSTBACK_UPSERT_PROVIDER,
    PostbackUpsertService
} from '@scaleo/affiliate/postback/upsert/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    CONVERSION_STATUSES_ID,
    PlatformListsService,
    PlatformListsStatusesEnum,
    PostbackLevelIdEnum
} from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { FindGoalsComponent } from '@scaleo/shared/components/find';
import { ValidationMethods } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-postback-create',
    templateUrl: './manager-postback-create.component.html',
    providers: [POSTBACK_UPSERT_PROVIDER, UnsubscribeService]
})
export class ManagerPostbackCreateComponent implements OnInit {
    readonly editId: number;

    readonly affiliateId: number;

    public form: FormGroup;

    public isLoad: boolean;

    public showOfferSection: boolean;

    public showPixelHelpLink: boolean;

    public codeLabel: string;

    showConversionStatusSelect = true;

    canEdit = true;

    showSelectStatus = true;

    disableLevelOfferSelect = false;

    goalsFirstItem = {
        id: 0,
        title: this.translate.instant('shared.dictionary.all'),
        type: 0
    };

    excludeOfferPostbackLevel$: Observable<number[]> = this.checkPermissionService
        .check$(this.permissions.canAccessOffers)
        .pipe(map((check) => (!check ? [PostbackLevelIdEnum.Offer] : [])));

    readonly excludePostbackStatus = [PlatformListsStatusesEnum.Pending];

    @ViewChild(FindGoalsComponent) findGoalsComponent: FindGoalsComponent;

    constructor(
        private modal3Service: Modal3Service,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private formBuilder: FormBuilder,
        private validation: ValidationMethods,
        private affiliatePostbackService: PostbacksService,
        private platformListsService: PlatformListsService,
        private translate: TranslateService,
        private profileQuery: ProfileQuery,
        private platformSettingsQuery: PlatformSettingsQuery,
        private readonly managerAffiliatePostbackUpsertService: PostbackUpsertService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly toastr: ToastrBarService,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) private readonly permissions: PlatformPermissionsType
    ) {
        const { editId, affiliateId } = this.modal3EditFormRef.config.data;
        this.editId = editId;
        this.affiliateId = affiliateId;
    }

    ngOnInit(): void {
        this.initForm();
        if (this.editId) {
            this.isLoad = false;
            this.managerAffiliatePostbackUpsertService
                .view(this.affiliateId, this.editId)
                .pipe(takeUntil(this.unsubscribe))
                .subscribe((postback) => {
                    this.loadFormData(postback);
                });
        } else {
            this.isLoad = true;
        }
    }

    public add(): void {
        if (this.form.valid) {
            const post: ManagerAffiliatePostbackUpsertPayloadModel = { ...this.form.value };

            const addUpdate = this.editId
                ? this.managerAffiliatePostbackUpsertService.update(this.affiliateId, this.editId, post)
                : this.managerAffiliatePostbackUpsertService.create(this.affiliateId, post);

            addUpdate.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
                this.modal3EditFormRef.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);
                this.toastr.successResponse(this.editId ? 'affiliate.postback.edited' : 'affiliate.postback.created');
            });
        } else {
            this.form.markAllAsTouched();
        }
    }

    delete(): void {
        const modalRef = this.modal3Service.confirm(this.translate.instant('delete.delete_confirm_text'), {
            title: this.translate.instant('delete.delete_confirm_text')
        });

        modalRef.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.managerAffiliatePostbackUpsertService.delete(this.affiliateId, this.editId)),
                take(1)
            )
            .subscribe(() => {
                this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
            });
    }

    public selectedOffer(): void {
        this.form.patchValue({
            goal_id: 0
        });

        // if (offer.newValue) {
        //     this.fetchGoals(offer.newValue);
        // }
    }

    public selectedLevel(level: any): void {
        if (level?.newValue === PostbackLevelsEnums.Offer) {
            this.showOfferSection = true;
            this.form.get('offer_id').setValidators(Validators.required);
            if (this.form.value.offer_id === 0) {
                this.form.patchValue({
                    offer_id: [],
                    goal_id: 0
                });
            }
        } else {
            console.log('esle');
            this.showOfferSection = false;
            this.form.get('offer_id').setValidators(null);
            this.form.patchValue({
                offer_id: 0
            });
        }
    }

    public selectedType(type: any): void {
        if (type.newValue) {
            if (type.newValue === PostbackTypesEnums.Pixel) {
                this.codeLabel = 'affiliate.postback.pixel_code';
                this.showPixelHelpLink = true;
            } else if (type.newValue === PostbackTypesEnums.Postback) {
                this.codeLabel = 'affiliate.postback.postback_code';
                this.showPixelHelpLink = false;
            }
            this.form.get('code').setValidators(Validators.required);
        } else {
            this.showPixelHelpLink = false;
            this.form.get('code').setValidators(null);
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: [],
            level_id: [PostbackLevelsEnums.Global, Validators.required],
            offer_id: [0],
            goal_id: [0],
            conversion_status: [CONVERSION_STATUSES_ID.pending, Validators.required],
            type: [1, Validators.required],
            code: [],
            status: [PlatformListsStatusesEnum.Active, Validators.required],
            affiliate_id: [this.affiliateId]
        });
        this.selectedType({ newValue: 1 });
    }

    private loadFormData(postback: any): void {
        this.isLoad = false;
        this.form.patchValue(postback);
        if (postback.level_id === PostbackLevelsEnums.Offer) {
            this.selectedLevel({ newValue: postback.level_id });
            // this.fetchGoals(this.form.value.offer_id);
        }
        this.selectedType({ newValue: postback.type });
        this.isLoad = true;
    }

    clearOffer(): void {
        this.findGoalsComponent.resetValue();
    }
}
