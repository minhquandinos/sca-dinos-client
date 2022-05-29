import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable, of, pluck, Subject, take } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import {
    PAYMENT_UPSERT_PROVIDER,
    PaymentMethodsModel,
    PaymentMethodsRequestModel,
    PaymentUpsertMethodsService
} from '@scaleo/feature/manager/settings/billing/payment-methods/data-access';
import { PlatformListsBaseInterface, PlatformListsService, PlatformListsStatusesEnum } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { ValidationMethods } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

@Component({
    selector: 'scaleo-mng-payment-methods-create',
    templateUrl: './payment-methods-create.component.html',
    providers: [PAYMENT_UPSERT_PROVIDER]
})
export class PaymentMethodsCreateComponent implements OnInit, OnDestroy {
    readonly editId: number;

    readonly platformListsStatusesEnum = PlatformListsStatusesEnum;

    public currencies$: Observable<PlatformListsBaseInterface[]> = this.platformListsService
        .platformListsNew('currencies')
        .pipe(pluck('currencies'));

    public form: FormGroup;

    public isLoad: boolean;

    private unsubscribe: Subject<void> = new Subject();

    public logo: string;

    constructor(
        private paymentUpsertMethodsService: PaymentUpsertMethodsService,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private validation: ValidationMethods,
        private readonly modal3: Modal3Service,
        private platformSettingsQuery: PlatformSettingsQuery,
        private toastr: ToastrBarService,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private platformListsService: PlatformListsService
    ) {
        this.editId = this.modal3EditFormRef.config.data?.editId;
    }

    ngOnInit(): void {
        this.initForm();
        if (this.editId) {
            this.loadFormData();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            status: PlatformListsStatusesEnum.Active,
            supported_currencies: [[]],
            payment_threshold: 50,
            payment_threshold_currency: this.platformSettingsQuery.settings.currency,
            payment_commission: 0,
            payment_method_logo: '',
            image_data: ''
        });
    }

    public add(): void {
        if (this.form.valid) {
            const post: PaymentMethodsRequestModel = this.preparePaymentMethodsForRequest();

            const addUpdate = this.editId
                ? this.paymentUpsertMethodsService.update(post, this.editId)
                : this.paymentUpsertMethodsService.create(post);

            addUpdate.pipe(take(1)).subscribe(() => {
                this.form.reset();
                this.toastr.successes(
                    this.translate.instant(
                        this.editId ? 'billing2.settings.payments_methods.edited' : 'billing2.settings.payments_methods.created'
                    )
                );

                this.modal3EditFormRef.close(null, this.editId ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create);
            });
        } else {
            this.validation.validateAllFormFields(this.form);
        }
    }

    private preparePaymentMethodsForRequest(): PaymentMethodsRequestModel {
        const supportedCurrenciesFormValue = this.form.get('supported_currencies').value;
        const supportedCurrencies = supportedCurrenciesFormValue ? (supportedCurrenciesFormValue as unknown as string[]).join(',') : '';
        const imageData = Util.checkBase64Image(this.logo) || this.form.get('payment_method_logo').value;

        return {
            ...this.form.value,
            image_data: imageData,
            supported_currencies: supportedCurrencies
        };
    }

    public delete(): void {
        const modalRef = this.modal3.confirm(this.translate.instant('delete.delete_confirm_text'), {
            title: this.translate.instant('delete.delete_confirm_title')
        });

        modalRef.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap((event) => {
                    if (event) {
                        return this.paymentUpsertMethodsService.delete(this.editId);
                    }
                    return of(null);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe(() => {
                this.toastr.successes(this.translate.instant('billing2.settings.payments_methods.deleted'));
                this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
            });
    }

    private loadFormData(): void {
        this.isLoad = false;
        this.paymentUpsertMethodsService
            .view(this.editId)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((payment: PaymentMethodsModel) => {
                this.logo = payment.image_data || null;
                this.form.patchValue({
                    ...payment,
                    payment_threshold: payment.payment_threshold,
                    payment_commission: payment.payment_commission,
                    supported_currencies: payment.supportedCurrenciesTransformToArray
                });
                this.isLoad = true;
            });
    }

    public changeImage(logo: string): void {
        this.logo = logo;
    }

    public deleteImage(): void {
        this.logo = '';
        this.form.patchValue({
            payment_method_logo: ''
        });
    }
}
