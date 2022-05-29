import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { defer, EMPTY, throwError } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';

import { BaseIdTitleModel, BooleanEnum } from '@scaleo/core/data';
import { JsonConvertService } from '@scaleo/core/services/json-convert';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    OFFER_LANDING_PAGE_UPSERT_PROVIDER,
    OfferLandingPageUpsertFormControlModel,
    OfferLandingPageUpsertModel,
    OfferLandingPageUpsertService
} from '@scaleo/feature/manager/offer/landing-page/upsert/data-access';
import { ExtendedTargetingComponent } from '@scaleo/feature/manager/offer/targeting/shared/components/extended-targeting';
import { OfferTargetingRuleModel } from '@scaleo/offer/common';
import { OfferUrlsTypeIdEnum, PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { MultiSelectDataConfigModel } from '@scaleo/shared/components2/multi-select-block';
import { ShortEntityNameEnum } from '@scaleo/shared/data-access/short-entity-list';
import { CustomValidators } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

const LINK_TRANSLATE_SCHEMA = 'table.column.link';

@Component({
    selector: 'app-offer-landing-page-upsert',
    templateUrl: './offer-landing-page-upsert.component.html',
    providers: [UnsubscribeService, OFFER_LANDING_PAGE_UPSERT_PROVIDER]
})
export class OfferLandingPageUpsertComponent implements OnInit {
    form: FormGroup;

    readonly editId: number;

    isLoad = false;

    title: string;

    showStatus = true;

    showDelete = false;

    initSpecificAffiliatesOnly: BaseIdTitleModel[] = [];

    initAllowed: BaseIdTitleModel[] = [];

    initDenied: BaseIdTitleModel[] = [];

    readonly multiSelectAffiliatesDataConfig: MultiSelectDataConfigModel = {
        serviceName: ShortEntityNameEnum.Affiliates,
        queryParams: {
            perPage: 20,
            page: 1,
            sortField: 'id',
            sortDirection: 'asc'
        }
    };

    readonly multiSelectGeoDataConfig: MultiSelectDataConfigModel = {
        serviceName: ShortEntityNameEnum.GeoNames,
        queryParams: {
            perPage: 20,
            page: 1,
            sortField: 'id',
            sortDirection: 'asc'
        }
    };

    isDefault: boolean;

    @ViewChild('extendedTargetingRef', { static: false })
    extendedTargetingComponent: ExtendedTargetingComponent;

    constructor(
        private readonly editFormRef: Modal3EditFormRef<any, OfferLandingPageUpsertModel>,
        private readonly fb: FormBuilder,
        private readonly offerLandingPageUpsertService: OfferLandingPageUpsertService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly translate: TranslateService,
        private readonly cdr: ChangeDetectorRef,
        private readonly jsonConvertService: JsonConvertService,
        private readonly toastr: ToastrBarService,
        private readonly modal3: Modal3Service
    ) {
        this.editId = this.editFormRef.config.data.id;
        this.isLoad = !this.editId;
    }

    ngOnInit(): void {
        this.setTitle();
        this.initForm();
        this.loadFormData();
    }

    save(): void {
        if (this.form.valid) {
            defer(() => (this.editId ? this.update$ : this.save$))
                .toPromise()
                .then();
        } else {
            this.form.markAllAsTouched();
        }
    }

    delete(): void {
        const content = this.translate.instant('delete.delete_confirm_text');
        this.modal3
            .confirm(content, { typeButton: 'delete' })
            .afterClosed$.pipe(switchMap(({ type }) => (type === Modal3CloseEventEnum.Confirm ? this.delete$ : EMPTY)))
            .toPromise()
            .then();
    }

    private initForm(): void {
        this.form = this.fb.group({
            title: ['', Validators.required],
            status: [PlatformListsStatusesEnum.Active, Validators.required],
            url: ['', [Validators.required, CustomValidators.checkUrl]],
            preview: ['', [CustomValidators.checkUrl]],
            visible_to_all_affiliates: [BooleanEnum.True],
            visible_to_specific_affiliates_only: [],
            geo_allowed: [],
            geo_denied: [],
            rules: this.fb.array([])
        });
    }

    private loadFormData(): void {
        if (this.editId) {
            this.offerLandingPageUpsertService
                .view(this.editId)
                .pipe(
                    tap((url) => {
                        const formValue: OfferLandingPageUpsertFormControlModel = this.jsonConvertService.mapper(
                            OfferLandingPageUpsertFormControlModel,
                            url
                        );

                        const { isDefault, rules } = formValue;

                        this.isDefault = isDefault;
                        this.form.patchValue(formValue);
                        this.isLoad = true;
                        this.cdr.detectChanges();
                        if (!this.isDefault) {
                            this.setControlRules(rules);
                        }
                    }),
                    tap(({ type: { id } }) => {
                        this.showStatus = ![OfferUrlsTypeIdEnum.Default, OfferUrlsTypeIdEnum.Preview].includes(id);
                        this.showDelete = [OfferUrlsTypeIdEnum.Public, OfferUrlsTypeIdEnum.Private].includes(id);
                    }),
                    tap(({ visible_to_specific_affiliates_only, geo_allowed, geo_denied }) => {
                        this.initSpecificAffiliatesOnly = visible_to_specific_affiliates_only;
                        this.initAllowed = geo_allowed;
                        this.initDenied = geo_denied;
                    }),
                    tap(() => {
                        this.cdr.markForCheck();
                    }),
                    takeUntil(this.unsubscribe)
                )
                .subscribe();
        }
    }

    private get save$(): any {
        return this.offerLandingPageUpsertService.store(this.form.value).pipe(
            tap((response) => {
                this.editFormRef.close(response, Modal3CloseEventEnum.Create);
                this.toastr.response(ToastrBarEventEnum.Created, LINK_TRANSLATE_SCHEMA);
            }),
            catchError((err) => {
                this.toastr.response(ToastrBarEventEnum.ExceptionCreated, LINK_TRANSLATE_SCHEMA);
                return throwError(err);
            })
        );
    }

    private get update$(): any {
        return this.offerLandingPageUpsertService.update(this.editId, this.form.value, this.isDefault).pipe(
            tap((response) => {
                this.editFormRef.close(response, Modal3CloseEventEnum.Update);
                this.toastr.response(ToastrBarEventEnum.Updated, LINK_TRANSLATE_SCHEMA);
            }),
            catchError((err) => {
                this.toastr.response(ToastrBarEventEnum.ExceptionUpdated, LINK_TRANSLATE_SCHEMA);
                return throwError(err);
            })
        );
    }

    private get delete$(): any {
        return this.offerLandingPageUpsertService.delete(this.editId).pipe(
            tap(() => {
                this.editFormRef.close(null, Modal3CloseEventEnum.Delete);
                this.toastr.response(ToastrBarEventEnum.Deleted, LINK_TRANSLATE_SCHEMA);
            }),
            catchError((err) => {
                this.toastr.response(ToastrBarEventEnum.ExceptionDeleted, LINK_TRANSLATE_SCHEMA);
                return throwError(err);
            })
        );
    }

    private setTitle(): void {
        const path = 'offers_page.urls';
        const translate = this.translate.instant(this.editId ? `${path}.edit` : `${path}.add_as_title`);
        this.title = this.editId ? `${translate} #${this.editId}` : translate;
    }

    private setControlRules(rules: OfferTargetingRuleModel[]): void {
        rules.forEach((field) => {
            const fieldsArray = this.form.get('rules') as FormArray;
            fieldsArray.push(this.extendedTargetingComponent.addField(field));
        });
    }
}
