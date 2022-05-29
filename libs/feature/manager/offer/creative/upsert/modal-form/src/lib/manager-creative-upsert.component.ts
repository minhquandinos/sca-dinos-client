import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, first, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    MANAGER_OFFER_CREATIVE_UPSERT_PROVIDER,
    OfferCreativeCreateInputDataModel,
    OfferCreativeCreateService,
    OfferCreativeFormControlModel
} from '@scaleo/feature/manager/offer/creative/upsert/data-access';
import { FileExtensionEnum } from '@scaleo/platform/data';
import { BaseStatusIdEnum, CreativeTypesIdEnum } from '@scaleo/platform/list/access-data';
import { CustomValidators, maxUploadSizeValidation, requiredFileType } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

import { OfferDetailQuery } from '../../../../../detail/data-access/src/lib/state';
import { ManagerOfferCreativeModel } from '../../../../list/data-access/src/lib/models/offer-creatives.model';

const CREATIVE_TITLE_SCHEMA = 'table.column.creative';

@Component({
    selector: 'app-offer-creative-create',
    templateUrl: './manager-offer-creative-upsert.component.html',
    providers: [MANAGER_OFFER_CREATIVE_UPSERT_PROVIDER, UnsubscribeService]
})
export class ManagerCreativeUpsertComponent implements OnInit {
    readonly id: number;

    readonly offerId: number;

    readonly mapMacrosAvailable: string[] = ['tracking_url', 'offer_id', 'affiliate_id', 'creative_id'];

    readonly creativeTypesIdEnum = CreativeTypesIdEnum;

    readonly title: string;

    readonly buttonLabel: string;

    @ViewChild('infoTemplate')
    private readonly _infoTemplate: TemplateRef<HTMLElement>;

    form: FormGroup;

    isLoad: boolean;

    requiredUploadTypesTranslate$: Observable<string>;

    creativeType$: Observable<CreativeTypesIdEnum>;

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _translate: TranslateService,
        private readonly _toastr: ToastrBarService,
        private readonly _modal3: Modal3Service,
        private readonly _modal3Ref: Modal3EditFormRef<ManagerOfferCreativeModel, OfferCreativeCreateInputDataModel>,
        private readonly _service: OfferCreativeCreateService,
        private readonly _unsubscribe: UnsubscribeService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _offerDetailQuery: OfferDetailQuery
    ) {
        const { id, offerId } = this._modal3Ref.config.data;
        [this.id, this.offerId] = [id, offerId];
        this.title = this._getTitle;
        this.buttonLabel = this._getButtonLabel;
    }

    ngOnInit(): void {
        this._init();
    }

    showInfo(): void {
        this._modal3.info(this._infoTemplate, {
            title: this._translate.instant('offers_page.creatives.form.macros_available.title')
        });
    }

    add(): void {
        if (this.form.valid) {
            const post: OfferCreativeFormControlModel = this.form.value;

            const req$ = this.id ? this._service.update(this.id, post) : this._service.create(post);

            req$.toPromise()
                .then((data: ManagerOfferCreativeModel) => {
                    const result = this.id ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create;
                    this._toastr.response(this.id ? ToastrBarEventEnum.Updated : ToastrBarEventEnum.Created, CREATIVE_TITLE_SCHEMA);
                    this._modal3Ref.close(data, result);
                })
                .catch(() => {
                    const exception = this.id ? ToastrBarEventEnum.ExceptionUpdated : ToastrBarEventEnum.ExceptionCreated;
                    this._toastr.response(exception, CREATIVE_TITLE_SCHEMA);
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    delete(): void {
        const title = this._translate.instant('delete.delete_confirm_title');
        const message = this._translate.instant('delete.delete_confirm_text');

        this._modal3
            .confirm(message, { title, typeButton: 'delete' })
            .afterClosed$.pipe(switchMap(({ type }) => (type === Modal3CloseEventEnum.Confirm ? this._delete$ : EMPTY)))
            .toPromise()
            .then();
    }

    selectedFile(event: File): void {
        if (event instanceof File) {
            this.form.patchValue({
                source_file: event,
                image_data: ''
            });
        } else {
            this.form.patchValue({
                image_data: event,
                source_file: ''
            });
        }
    }

    private _init(): void {
        this._setRequiredUploadTypesTranslate();
        this._initForm();
        this.creativeType$ = this._getCreativeType$;

        if (this.id) {
            this._loadFormData();
        } else {
            this._setDefaultOfferUrlIdToForm();
        }
    }

    private _initForm(): void {
        this.form = this._formBuilder.group({
            title: ['', Validators.required],
            description: '',
            type: CreativeTypesIdEnum.Banner,
            offer_url_id: [undefined, Validators.required],
            count_impressions: 0,
            html_code: '',
            plain_text: '',
            status: [BaseStatusIdEnum.Active, Validators.required],
            image_data: '',
            xml_feed_url: '',
            banner: '',
            source_file: ''
        });
    }

    private _loadFormData(): void {
        this._service
            .view(this.id)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe((creative) => {
                const { type, image, offer_url } = creative;
                this.form.patchValue({
                    ...creative,
                    banner: type.id === CreativeTypesIdEnum.Banner ? image : '',
                    type: type.id,
                    offer_url_id: offer_url.id
                });
                this.form.get('type').disable();
                this.isLoad = true;
            });
    }

    private _setDefaultOfferUrlIdToForm(): void {
        this._offerDetailQuery.defaultLandingPage$
            .pipe(
                tap(({ id }) => {
                    this.form.patchValue({
                        offer_url_id: id
                    });
                }),
                first()
            )
            .subscribe();
    }

    private get _delete$(): Observable<void> {
        return this._service.delete(this.id).pipe(
            tap(() => {
                this._modal3Ref.close(null, Modal3CloseEventEnum.Delete);
                this._toastr.response(ToastrBarEventEnum.Deleted, CREATIVE_TITLE_SCHEMA);
            }),
            catchError((err) => {
                this._toastr.response(ToastrBarEventEnum.ExceptionDeleted, CREATIVE_TITLE_SCHEMA);
                return throwError(err);
            })
        );
    }

    private _addValidators(type: CreativeTypesIdEnum): void {
        const bannerControl = this.form.get('banner');
        const bannerValidators = [Validators.required, requiredFileType(this._getValidatorsFileTypes)];
        switch (type) {
            case CreativeTypesIdEnum.Banner:
                if (!bannerControl.value) bannerValidators.push(maxUploadSizeValidation(100));
                bannerControl.setValidators(bannerValidators);
                break;
            case CreativeTypesIdEnum.XMLFeed:
                this.form.get('xml_feed_url').setValidators([Validators.required, CustomValidators.checkUrl]);
                break;
            default:
                this.form.get('html_code').setValidators(Validators.required);
                break;
        }

        if (type !== CreativeTypesIdEnum.XMLFeed) {
            this.form.get('offer_url_id').setValidators(Validators.required);
        }
    }

    private _clearValidators(type: CreativeTypesIdEnum): void {
        const controlsForClearValidator = ['banner', 'xml_feed_url', 'html_code'];
        controlsForClearValidator.forEach((controlKey) => {
            const control = this.form.get(controlKey);
            control.clearValidators();
            control.updateValueAndValidity();
        });

        const offerUrlIdControl = this.form.get('offer_url_id');
        if (type === CreativeTypesIdEnum.XMLFeed) {
            offerUrlIdControl.clearValidators();
            offerUrlIdControl.updateValueAndValidity();
        }
    }

    private get _getValidatorsFileTypes(): string {
        const requiredTypes = [FileExtensionEnum.PNG, FileExtensionEnum.JPG, FileExtensionEnum.JPEG, FileExtensionEnum.GIF];

        if (!this.id) {
            requiredTypes.push(FileExtensionEnum.ZIP);
        }
        return ArrayUtil.join(requiredTypes);
    }

    private _setRequiredUploadTypesTranslate(): void {
        const schema = 'offers_page.creatives.form.select_required_types';
        this.requiredUploadTypesTranslate$ = this._translate.stream(this.id ? `${schema}_edit` : schema);
    }

    private get _getTitle(): string {
        const translateSchema = this.id ? 'offers_page.creatives.edit' : 'offers_page.creatives.add_as_title';
        const translate = this._translate.instant(translateSchema);
        return this.id ? `${translate} #${this.id}` : translate;
    }

    private get _getCreativeType$(): Observable<CreativeTypesIdEnum> {
        const control = this.form.get('type');
        return control.valueChanges.pipe(
            startWith(control.value as CreativeTypesIdEnum),
            map((): any => control.value),
            tap((type: CreativeTypesIdEnum) => {
                this._clearValidators(type);
                this._addValidators(type);
                this._setValueForOfferUrlIdControl(type);
                this._cdr.detectChanges();
            }),
            shareReplay()
        );
    }

    private _setValueForOfferUrlIdControl(type: CreativeTypesIdEnum): void {
        const offerUrlIdControl = this.form.get('offer_url_id');
        const offerUrlIdValue = offerUrlIdControl.value || this._offerDetailQuery.defaultLandingPage('id');
        offerUrlIdControl.patchValue(type === CreativeTypesIdEnum.XMLFeed ? undefined : offerUrlIdValue);
    }

    private get _getButtonLabel(): string {
        const titleSchema = this.id ? 'shared.dictionary.save' : 'shared.dictionary.add';
        return this._translate.instant(titleSchema);
    }
}
