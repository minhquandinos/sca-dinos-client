import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';

import {
    AffiliatePaymentMethodsUpsertService,
    BILLING_PAYMENT_METHOD_UPSERT,
    CreatePaymentMethodModel,
    PaymentMethodBySupportedCurrencyModel
} from '@scaleo/affiliate-billing/payment-methods/upsert/data-access';
import { BillingAffiliatePaymentsMethodModel } from '@scaleo/affiliate-billing/payment-methods/widget/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3CloseEventEnum, Modal3EditFormRef, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { Util } from '@scaleo/utils';

@Component({
    selector: 'app-create-affiliate-payment-methods',
    templateUrl: './affiliate-payment-methods-upsert.component.html',
    providers: [BILLING_PAYMENT_METHOD_UPSERT, UnsubscribeService]
})
export class AffiliatePaymentMethodsUpsertComponent implements OnInit, AfterViewInit {
    readonly method: BillingAffiliatePaymentsMethodModel;

    readonly hasAddedPaymentMethod: boolean;

    readonly affiliateId: number;

    form: FormGroup;

    title$ = this.getTitle('create');

    methods$: Observable<PaymentMethodBySupportedCurrencyModel[]>;

    formCurrency$: Observable<CurrencyEnum>;

    @HostBinding('class') hostClass = 'select-payment-methods';

    constructor(
        private readonly createAffiliatePaymentMethodsService: AffiliatePaymentMethodsUpsertService,
        public readonly shared: SharedMethodsService,
        private readonly formBuilder: FormBuilder,
        private readonly translate: TranslateService,
        private readonly toastr: ToastrBarService,
        private readonly platformSettingsQuery: PlatformSettingsQuery,
        private readonly unsubscribe: UnsubscribeService,
        private readonly cdr: ChangeDetectorRef,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        private readonly modal3Service: Modal3Service
    ) {
        const { method = undefined, hasAddedPaymentMethod = false, affiliateId = undefined } = modal3EditFormRef.config?.data || {};
        this.method = method;
        this.hasAddedPaymentMethod = hasAddedPaymentMethod;
        this.affiliateId = affiliateId;
    }

    ngOnInit(): void {
        this.initForm();
        this.formCurrency$ = this.getFormCurrency$;
        this.methods$ = this.getPaymentMethods$;

        if (this.hasAddedPaymentMethod) {
            this.title$ = this.getTitle('update');
        }
    }

    ngAfterViewInit(): void {
        this.checkCreatingFirstPaymentMethod();
    }

    public changeFormCurrency(): void {
        this.form.patchValue({
            payment_method_id: undefined
        });
    }

    public save(): void {
        if (this.form.valid) {
            const { payment_method_id: id, payment_method_info: info, currency } = this.form.value;

            const post: CreatePaymentMethodModel = {
                currency,
                payment_method_id: id,
                payment_method_info: info,
                affiliate_id: this.affiliateId
            };

            const request: Observable<CreatePaymentMethodModel> =
                this.method?.payment_method && this.hasAddedPaymentMethod
                    ? this.createAffiliatePaymentMethodsService.update(post)
                    : this.createAffiliatePaymentMethodsService.create(post);

            const resultEvent = this.method ? Modal3CloseEventEnum.Update : Modal3CloseEventEnum.Create;

            request
                .pipe(
                    tap(() => {
                        this.modal3EditFormRef.close(null, resultEvent);
                    }),
                    catchError((error) => {
                        const message = !Util.isEmpty(error?.info?.errors) ? error?.info?.errors : error?.message;
                        this.toastr.displayValidationMessages(message);
                        return throwError(error);
                    }),
                    take(1)
                )
                .subscribe();
        } else {
            this.form.markAllAsTouched();
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            currency: [this.method?.currency || undefined, Validators.required],
            payment_method_id: [this.method?.payment_method?.id || undefined, Validators.required],
            payment_method_info: [this.method?.payment_method_info || '', Validators.required]
        });
    }

    changePaymentMethod(): void {
        this.form.patchValue({
            payment_method_info: ''
        });
    }

    private get getFormCurrency$(): Observable<CurrencyEnum> {
        return this.form.get('currency').valueChanges.pipe(startWith(this.form.get('currency').value as CurrencyEnum), shareReplay());
    }

    private get getPaymentMethods$(): Observable<PaymentMethodBySupportedCurrencyModel[]> {
        return this.formCurrency$.pipe(
            tap((value) => value),
            filter((currency: CurrencyEnum) => !!currency),
            switchMap((currency) => this.createAffiliatePaymentMethodsService.index(currency)),
            tap((methods) => {
                if (methods.length && !this.form.value.payment_method_id) {
                    const firstPaymentMethod: PaymentMethodBySupportedCurrencyModel = methods[0];
                    this.form.patchValue({
                        payment_method_id: firstPaymentMethod.id
                    });
                }
            })
        );
    }

    private checkCreatingFirstPaymentMethod(): void {
        if (!this.method && !this.hasAddedPaymentMethod) {
            const { currency } = this.platformSettingsQuery.settings;
            this.form.patchValue({
                currency
            });
            this.cdr.detectChanges();
        }
    }

    public delete(): void {
        const titleForMessage = this.translate.instant('table.column.payment_method');

        const modal$ = this.modal3Service.confirm(this.translate.instant('confirm_message.delete', { title: titleForMessage }), {
            title: this.translate.instant('delete.delete_confirm_title')
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Confirm),
                switchMap(() => this.createAffiliatePaymentMethodsService.delete(this.method.id as number)),
                take(1)
            )
            .subscribe(() => {
                this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Delete);
            });
    }

    private getTitle(type: 'create' | 'update'): Observable<string> {
        const translate = 'billing2.settings.payments_methods';
        const map: BaseObjectModel = {
            create: 'add_as_title',
            update: 'edit'
        };
        const title = `${translate}.${map[type]}`;
        return this.translate.stream(title || map['create']);
    }
}
