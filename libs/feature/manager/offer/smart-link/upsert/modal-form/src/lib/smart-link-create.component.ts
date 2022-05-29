import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, filter, Observable, throwError } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_SMART_LINK_UPSERT_PROVIDER,
    ManagerSmartLinkUpsertService,
    SmartLinkUpsertModel,
    SmartLinkViewModel
} from '@scaleo/feature/manager/offer/smart-link/upsert/data-access';
import { PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { CheckPermissionService, PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { PLATFORM_PLAN_FEATURE_TOKEN, PlatformPlanFeatureType } from '@scaleo/platform-permission-plan-common';
import { PlanFeatureService } from '@scaleo/platform-permission-plan-service';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

import { DomainsForTrackingLinkService } from './components/domains-for-tracking-link/domains-for-tracking-link.service';
import { OtherOffersItemModel } from './components/other-offers/other-offers.model';
import { OtherOffersService } from './components/other-offers/other-offers.service';

@Component({
    selector: 'app-smart-link-create',
    templateUrl: './smart-link-create.component.html',
    providers: [UnsubscribeService, MANAGER_SMART_LINK_UPSERT_PROVIDER, OtherOffersService, DomainsForTrackingLinkService]
})
export class SmartLinkCreateComponent implements OnInit {
    readonly editId: number;

    // @Output() addSuccesses: EventEmitter<string> = new EventEmitter<string>();

    // public readonly statuses = smartLinkStatuses;

    readonly excludeStatusId = [PlatformListsStatusesEnum.Pending];

    public isLoad = false;

    public form: FormGroup;

    disabledAction$ = this.checkPermissionService
        .check$([this.planFeature.smartLink, this.permissions.canAddEditDeleteSmartLinks], 'every')
        .pipe(map((status) => !status));

    constructor(
        private service: ManagerSmartLinkUpsertService,
        private toastr: ToastrBarService,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private otherOffersService: OtherOffersService,
        private unsubscribe: UnsubscribeService,
        private planPermissions: PlanFeatureService,
        private readonly modal3: Modal3Service,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private readonly checkPermissionService: CheckPermissionService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        @Inject(PLATFORM_PLAN_FEATURE_TOKEN) public readonly planFeature: PlatformPlanFeatureType
    ) {
        const { editId } = this.modal3EditFormRef.config.data;
        this.editId = editId;
    }

    ngOnInit(): void {
        this.init();
    }

    private init() {
        this.initForm();
        if (this.editId) {
            this.getDetail();
        } else {
            this.createFirstOtherOffer();
            this.isLoad = true;
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: this.editId || undefined,
            title: ['', Validators.required],
            image: '',
            traffic_distribution: undefined,
            available_for_affiliates: BooleanEnum.True,
            status: PlatformListsStatusesEnum.Active,
            description: '',
            other_offers: this.formBuilder.array([]),
            domain_for_tracking_link: undefined,
            allowed_traffic_types: undefined,
            offers_with_tags: undefined,
            image_data: ''
        });
    }

    private getDetail() {
        this.service
            .view(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((smartLink: SmartLinkViewModel) => {
                this.form.patchValue({
                    ...smartLink,
                    offers_with_tags: smartLink.offers_with_tags_selected,
                    traffic_distribution: smartLink.traffic_distribution
                });
                this.initOtherOffers(smartLink.other_offers);
                this.isLoad = true;
            });
    }

    public add() {
        if (!this.checkPermissionService.check([this.planFeature.smartLink, this.permissions.canAddEditDeleteSmartLinks], 'every')) {
            return;
        }

        if (this.form.valid) {
            if (this.planPermissions.allowSmartLink) {
                this.createUpdateSmartLink();
            } else {
                this.displayMessageForUpgradePlan();
            }
        } else {
            this.form.markAllAsTouched();
        }
    }

    private createUpdateSmartLink() {
        const smartLink = this.form.getRawValue();
        smartLink.other_offers = this.getOtherOffersId;

        const addEditRequest: Observable<SmartLinkUpsertModel> = this.editId
            ? this.service.update(this.editId, smartLink)
            : this.service.create(smartLink);

        addEditRequest
            .pipe(
                catchError((error) => {
                    if (error) {
                        this.toastr.displayValidationMessages(error);
                    }
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.form.reset();
                this.toastr.successes(this.translate.instant(this.editId ? 'smart_link_page.edited' : 'smart_link_page.created'));
                this.modal3EditFormRef.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);
            });
    }

    public delete() {
        if (this.planPermissions.allowSmartLink) {
            const modalRef = this.modal3.confirm(this.translate.instant('smart_link_page.delete_confirm_text'), {
                title: this.translate.instant('smart_link_page.delete_confirm_title')
            });

            modalRef.afterClosed$
                .pipe(
                    filter(({ type }) => Modal3CloseEventEnum.Confirm == type),
                    switchMap(() => this.service.delete(this.editId)),
                    takeUntil(this.unsubscribe)
                )
                .subscribe(() => {
                    this.toastr.successes(this.translate.instant('smart_link_page.deleted'));
                    this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
                });
        } else {
            this.displayMessageForUpgradePlan();
        }
    }

    public changeImage(image: string) {
        this.form.patchValue({ image_data: image });
    }

    public deleteImage() {
        this.form.patchValue({
            image: '',
            image_data: ''
        });
        this.service.deleteImage(this.editId).pipe(takeUntil(this.unsubscribe)).subscribe();
    }

    private createFirstOtherOffer() {
        (this.form.get('other_offers') as FormArray).push(this.otherOffersService.addOffer());
    }

    private initOtherOffers(otherOffers: number[]) {
        if (otherOffers?.length > 0) {
            otherOffers.forEach((offer) => {
                (this.form.get('other_offers') as FormArray).push(this.otherOffersService.addOffer(offer));
            });
        } else {
            this.createFirstOtherOffer();
        }
    }

    private get getOtherOffersId(): number[] {
        return this.form
            .get('other_offers')
            .value.map((item: OtherOffersItemModel) => +item.offer_id)
            .filter((id: number) => id);
    }

    private displayMessageForUpgradePlan() {
        this.toastr.error(this.translate.instant('upgrade_plan.message'));
    }
}
