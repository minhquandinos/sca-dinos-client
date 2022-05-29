import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { defer, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { ValidationErrorsTranslateEnum } from '@scaleo/core/error/common';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    Billing2InvoiceGenerateRequestDto,
    Billing2InvoiceGenerateService,
    INVOICE_GENERATE_AFFILIATE_ALL,
    INVOICE_GENERATE_PROVIDER,
    InvoiceGenerateApprovedBalanceModel,
    InvoiceGeneratePaymentInfoDto,
    InvoiceGeneratePaymentInfoModel
} from '@scaleo/feature/manager/affiliate-billing/invoice/generate/data-access';
import { Billing2InvoicesToastrService } from '@scaleo/feature/manager/affiliate-billing/invoices/data-access';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { FileExtensionEnum } from '@scaleo/platform/data';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { SelectChangeModel } from '@scaleo/shared/components/select';
import { minMaxValidation } from '@scaleo/shared/validators';
import { Modal3CloseEventEnum, Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ErrorUtil, formUtil } from '@scaleo/utils';

@Component({
    selector: 'app-billing2-invoice-create',
    templateUrl: './billing2-invoice-generate.component.html',
    providers: [UnsubscribeService, INVOICE_GENERATE_PROVIDER, Billing2InvoicesToastrService]
})
export class Billing2InvoiceGenerateComponent implements OnInit {
    affiliateId: number;

    form: FormGroup;

    allAffiliates$: Observable<boolean>;

    currencyLabel$: Observable<string>;

    paymentInfo: InvoiceGeneratePaymentInfoModel;

    singleAffiliate$: Observable<boolean>;

    showIncludeReferralBalance$: Observable<boolean>;

    approvedBalance$: Observable<InvoiceGenerateApprovedBalanceModel>;

    allowedAcceptFile = [
        FileExtensionEnum.PDF,
        FileExtensionEnum.PNG,
        FileExtensionEnum.DOC,
        FileExtensionEnum.XLS,
        FileExtensionEnum.CSV,
        FileExtensionEnum.JPEG,
        FileExtensionEnum.DOCX,
        FileExtensionEnum.XLSX
    ];

    exceptInvoicesStatuses = [InvoiceStatusNameEnum.Paid];

    @ViewChild('formRef')
    private readonly _formRef: ElementRef;

    constructor(
        private _fb: FormBuilder,
        private _settingsQuery: PlatformSettingsQuery,
        private _unsubscribe: UnsubscribeService,
        private _invoiceGenerateService: Billing2InvoiceGenerateService,
        private _invoicesToastrService: Billing2InvoicesToastrService,
        private _translate: TranslateService,
        private readonly _modal3EditFormRef: Modal3EditFormRef
    ) {
        const { affiliateId } = this._modal3EditFormRef.config.data;
        this.affiliateId = affiliateId;
    }

    ngOnInit(): void {
        this._initForm();
        this._initAllAffiliates();
        this.singleAffiliate$ = this.allAffiliates$.pipe(map((value) => !value));
        this.showIncludeReferralBalance$ = this._showIncludeReferralBalance;
        this._setCurrencyLabel();
        this._initApprovedBalance();
    }

    onChangeCurrency(event: SelectChangeModel): void {
        if (this.form.get('affiliate_id').value !== INVOICE_GENERATE_AFFILIATE_ALL) {
            this._getPaymentInfo({
                affiliate_id: this.form.get('affiliate_id').value,
                currency: event.newValue as CurrencyEnum
            });
        }
    }

    onChangeAffiliates(event: SelectChangeModel): void {
        if (event.newValue !== INVOICE_GENERATE_AFFILIATE_ALL) {
            this._getPaymentInfo({
                affiliate_id: event.newValue as number,
                currency: this._settingsQuery.settings.currency
            });
        }
    }

    generate(): void {
        this._save();
    }

    private _getPaymentInfo({ affiliate_id, currency }: InvoiceGeneratePaymentInfoDto): void {
        this._invoiceGenerateService
            .getPaymentInfo({
                affiliate_id,
                currency
            })
            .toPromise()
            .then((response) => {
                this.paymentInfo = response;
            });
    }

    private _initForm(): void {
        this.form = this._fb.group({
            affiliate_id: [this.affiliateId || INVOICE_GENERATE_AFFILIATE_ALL, Validators.required],
            end_date: [null, Validators.required],
            start_date: [''],
            payment_methods: [null],
            currency: [null],
            include_referral_balance: [BooleanEnum.False],
            invoice_memo: [''],
            internal_notes: [''],
            status: [InvoiceStatusNameEnum.Draft],
            attachment_file: [''],
            amount: undefined
        });
    }

    private get _showIncludeReferralBalance(): Observable<boolean> {
        const { currency } = this._settingsQuery.settings;

        const all$ = (stream: Observable<boolean>): Observable<any> =>
            stream.pipe(
                tap(() => {
                    this.form.get('include_referral_balance').patchValue(BooleanEnum.True);
                })
            );

        const single$ = (stream: Observable<boolean>): Observable<boolean> =>
            stream.pipe(
                switchMap(() => this.form.get('currency').valueChanges.pipe(startWith(this.form.get('currency').value as string))),
                map((selectedCurrency) => selectedCurrency === currency),
                tap((defaultCurrency) => {
                    if (defaultCurrency) {
                        this.form.get('include_referral_balance').patchValue(BooleanEnum.True);
                    } else {
                        this.form.get('include_referral_balance').patchValue(BooleanEnum.False);
                    }
                })
            );

        return this._settingsQuery.settings$.pipe(
            pluck('affReferralProgram'),
            filter((value) => !!value),
            switchMap(() => this.allAffiliates$),
            switchMap((all: boolean) => defer(() => (all ? all$(of(all)) : single$(of(all)))))
        );
    }

    private _save(): void {
        const { value, valid } = this.form;

        if (valid) {
            const payload: Billing2InvoiceGenerateRequestDto = {
                ...value
            };

            this._invoiceGenerateService.store(payload).then(
                (response) => {
                    if (response) {
                        this._modal3EditFormRef.close(response, Modal3CloseEventEnum.Create);
                        this._invoicesToastrService.created();
                    }
                },
                ({ info: { errors } }) => {
                    switch (true) {
                        case ErrorUtil.hasError(errors, 'currency'):
                            this._invoicesToastrService.custom('invoice.generate.no_payment_methods_exception');
                            break;
                        case ErrorUtil.hasError(errors, 'amount'):
                            this._invoicesToastrService.custom(ValidationErrorsTranslateEnum.AmountShouldHigherPaymentThreshold);
                            break;
                        default:
                            this._invoicesToastrService.exceptionCreated();
                    }
                }
            );
        } else {
            this.form.markAllAsTouched();
            formUtil.scrollToFirstInvalidControl(this._formRef);
        }
    }

    private _initApprovedBalance(): void {
        this.approvedBalance$ = this.singleAffiliate$.pipe(
            filter((single) => single),
            switchMap(() => this.form.valueChanges.pipe(startWith(this.form.value as Record<string, unknown>))),
            debounceTime(100),
            filter((value) => !!value),
            map(({ affiliate_id, currency, end_date, start_date }) => ({
                affiliate_id,
                currency,
                start_date,
                end_date
            })),
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
            switchMap((params) => this._invoiceGenerateService.getApprovedBalance(params)),
            tap(({ balance }: InvoiceGenerateApprovedBalanceModel) => {
                const amountControl = this.form.get('amount');
                amountControl.setValidators(minMaxValidation(0, +balance));
                amountControl.updateValueAndValidity();
            })
        );
    }

    private _initAllAffiliates(): void {
        this.allAffiliates$ = this.form.get('affiliate_id').valueChanges.pipe(
            startWith(this.form.get('affiliate_id').value as number),
            map((affiliate) => affiliate === INVOICE_GENERATE_AFFILIATE_ALL),
            tap((all) => {
                // this.allAffiliates = all;
                if (all) {
                    this.form.patchValue({
                        currency: null,
                        status: InvoiceStatusNameEnum.Draft
                    });
                    this.form.get('currency').clearValidators();
                } else {
                    const { currency } = this._settingsQuery.settings;
                    this.form.patchValue({
                        currency,
                        payment_methods: null,
                        status: ''
                    });
                    this.form.get('currency').setValidators(Validators.required);
                }
            }),
            shareReplay()
        );
    }

    private _setCurrencyLabel(): void {
        this.currencyLabel$ = this.allAffiliates$.pipe(
            switchMap((all) => {
                const schema = 'interface.basic';
                return this._translate.stream(all ? `${schema}.currencies` : `${schema}.currency`);
            })
        );
    }

    initialCurrency(): void {
        if (this.affiliateId) {
            this.onChangeCurrency({
                newValue: this.form.get('currency').value,
                oldValue: ''
            });
        }
    }
}
