import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { map, pluck, share, shareReplay, startWith, switchMap, take } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { OfferDetailViewModel } from '@scaleo/feature/manager/offer/detail/widget/data-access';
import { OFFER_UPSERT_PROVIDER, OfferFormDataDto, OfferUpsertService } from '@scaleo/feature/manager/offer/upsert/data-access';
import { PlatformCurrencyService } from '@scaleo/platform/currency/service';
import { DateUtil } from '@scaleo/platform/date/util';
import {
    GoalTypeEnum,
    OffersVisibilityIdEnum,
    PlatformListsFormatInterface,
    PlatformListsService,
    PlatformListsStatusesEnum
} from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { DEFAULT_IMAGE, DefaultImagePipe } from '@scaleo/shared/pipes';
import { CustomValidators } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

const OFFER_TITLE_SCHEMA = 'table.column.offer';

@Component({
    selector: 'app-offer-create',
    templateUrl: './offer-upsert.component.html',
    providers: [OFFER_UPSERT_PROVIDER, DefaultImagePipe]
})
export class OfferUpsertComponent implements OnInit {
    editId: number;

    isLoad = false;

    form: FormGroup;

    logo: string;

    isAdvertiserDisabled: boolean;

    currencySign$: Observable<string>;

    readonly affiliateTags$ = this.getAffiliateTags$;

    readonly title: string;

    constructor(
        private readonly service: OfferUpsertService,
        private readonly formBuilder: FormBuilder,
        private readonly platformListsService: PlatformListsService,
        private readonly defaultImagePipe: DefaultImagePipe,
        private readonly translate: TranslateService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly toastr: ToastrBarService,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private readonly modal3: Modal3Service,
        private readonly platformCurrencyService: PlatformCurrencyService
    ) {
        const { editId } = this.modal3EditFormRef.config.data;
        this.editId = editId;
        this.title = this.getTitle;
    }

    ngOnInit(): void {
        this.initForm();

        if (this.editId) {
            this.loadFormData();
        } else {
            this.currencySign$ = this.getCurrencySign$;
            this.isLoad = true;
        }
    }

    changeImage(image: string): void {
        this.logo = image;
        this.form.patchValue({
            image_data: image
        });
    }

    deleteImage(): void {
        this.changeImage('');
        this.form.patchValue({
            image: ''
        });
        this.service.deleteImage(this.editId).then();
    }

    onChangeDate(date: string): void {
        this.form.patchValue({
            expiration_date: date
        });
    }

    add(): void {
        if (this.form.valid) {
            const formData: OfferFormDataDto = this.form.value;
            const request$ = this.editId ? this.service.update(this.editId, formData) : this.service.create(formData);

            request$
                .then((data) => {
                    const toastrBarEvent = this.editId ? ToastrBarEventEnum.Updated : ToastrBarEventEnum.Created;
                    const result = this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create;

                    this.toastrResponseMessage(toastrBarEvent);
                    console.log(data, result);
                    this.modal3EditFormRef.close(data, result);
                })
                .catch(() => {
                    const exception = this.editId ? ToastrBarEventEnum.ExceptionUpdated : ToastrBarEventEnum.ExceptionCreated;
                    this.toastrErrorMessage(exception);
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    delete(): void {
        const content = this.translate.instant('offers_page.basic.delete_confirm_text');
        const title = this.translate.instant('offers_page.basic.delete_confirm_title');

        this.modal3
            .confirm(content, {
                title,
                typeButton: 'delete'
            })
            .afterClosed$.pipe(
                switchMap((event) => (event.type === Modal3CloseEventEnum.Confirm ? this.service.delete(this.editId) : EMPTY)),
                take(1)
            )
            .subscribe(
                () => {
                    this.toastrResponseMessage(ToastrBarEventEnum.Deleted);
                    this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
                },
                () => {
                    this.toastrErrorMessage(ToastrBarEventEnum.ExceptionDeleted);
                }
            );
    }

    private initForm(): void {
        let appendGroup = {};
        if (!this.editId) {
            appendGroup = {
                visible_type: [OffersVisibilityIdEnum.Public, Validators.required],
                default_url: ['', [Validators.required, CustomValidators.checkUrl]],
                preview_url: ['', CustomValidators.checkUrl],
                goal_title: ['', Validators.required],
                goal_type: ['', Validators.required],
                goal_revenue: ['', Validators.required],
                goal_payout: ['', Validators.required]
            };
        }

        const { currency, platform_time_zone } = this.platformSettingsQuery.settings;

        this.form = this.formBuilder.group({
            id: null,
            title: ['', Validators.required],
            status: [PlatformListsStatusesEnum.Active, Validators.required],
            description: '',
            internal_info: '',
            advertiser_id: [null, Validators.required],
            currency: [currency, Validators.required],
            image: '',
            tags: [],
            traffic_types: [],
            is_featured: BooleanEnum.False,
            is_expires: BooleanEnum.False,
            expiration_date: DateUtil.makeDate(DateUtil.now()),
            timezone: [platform_time_zone, Validators.required],
            image_data: '',
            ...appendGroup
        });

        this.isAdvertiserDisabled = !!this.editId;
    }

    private loadFormData(): void {
        this.service.view(this.editId).then((data: OfferDetailViewModel) => {
            this.setOfferFormAndData(data);
            this.isLoad = true;
        });
    }

    private setOfferFormAndData(data: OfferDetailViewModel): void {
        const { currency, status, timezone, advertiser, expiration_date, image_url } = data;

        this.form.patchValue({
            ...data,
            currency: currency.code,
            status: status.id,
            timezone: timezone?.timezone,
            advertiser_id: +advertiser.id,
            expiration_date: expiration_date || this.form.value.expiration_date
        });

        const imageData = this.defaultImagePipe.transform(image_url, DEFAULT_IMAGE.offer);
        this.changeImage(imageData);
    }

    private get getAffiliateTags$(): Observable<PlatformListsFormatInterface[]> {
        return this.platformListsService.platformListsNew('affiliates_tags').pipe(
            pluck('affiliates_tags'),
            map((tags) => this.sortAffiliateTags(tags)),
            share()
        );
    }

    private sortAffiliateTags(tags: PlatformListsFormatInterface[]): PlatformListsFormatInterface[] {
        return tags.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        });
    }

    private get getCurrencySign$(): Observable<string> {
        const currencyControl = this.form.get('currency');
        const goalTypeControl = this.form.get('goal_type');
        return combineLatest([
            currencyControl.valueChanges.pipe(startWith(currencyControl.value as string)),
            goalTypeControl.valueChanges.pipe(startWith(goalTypeControl.value as string))
        ]).pipe(
            map(([currency, goalType]) => (goalType === GoalTypeEnum.CPS ? '%' : this.platformCurrencyService.sign(currency))),
            shareReplay()
        );
    }

    private toastrResponseMessage(
        toastrBarEvent: ToastrBarEventEnum.Created | ToastrBarEventEnum.Updated | ToastrBarEventEnum.Deleted
    ): void {
        this.toastr.response(toastrBarEvent, OFFER_TITLE_SCHEMA);
    }

    private toastrErrorMessage(
        exception: ToastrBarEventEnum.ExceptionCreated | ToastrBarEventEnum.ExceptionUpdated | ToastrBarEventEnum.ExceptionDeleted
    ): void {
        this.toastr.response(exception, OFFER_TITLE_SCHEMA);
    }

    private get getTitle(): string {
        const path = 'offers_page.basic';
        const translateSchema = this.editId ? `${path}.edit` : `${path}.add_as_title`;
        const translate = this.translate.instant(translateSchema);
        return this.editId ? `${translate} #${this.editId}` : translate;
    }
}
