import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, defer, delay, exhaustMap, Observable, of, tap, throwError } from 'rxjs';
import { filter, map, pluck, switchMap, take, takeUntil } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AffiliatePaymentMethodsUpsertComponent } from '@scaleo/affiliate-billing/payment-methods/upsert/modal-form';
import {
    AFFILIATE_BILLING_PAYMENT_METHODS_PROVIDER,
    AffiliateBillingPaymentMethodsQuery,
    AffiliateBillingPaymentsMethodsService,
    BillingAffiliatePaymentsMethodModel
} from '@scaleo/affiliate-billing/payment-methods/widget/data-access';
import { BaseObjectModel } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import type { StartTrackByType } from '@scaleo/shared/directives';
import { StartTrackEnum } from '@scaleo/shared/directives';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService, UiSimpleTableHeaderModel } from '@scaleo/ui-kit/elements';

import { RequestPaymentModalOutputModel } from './components/request-payment-modal/models/request-payment-modal.model';
import { RequestPaymentModalComponent } from './components/request-payment-modal/request-payment-modal.component';
import {
    AFFILIATE_PAYMENTS_METHODS_COLUMNS_TOKEN,
    AffiliatePaymentsMethodsColumnsProvider
} from './providers/affiliate-payments-methods-columns.provider';

@Component({
    selector: 'scaleo-affiliate-billing-payments-methods',
    templateUrl: './billing-affiliate-payments-methods.component.html',
    providers: [AFFILIATE_BILLING_PAYMENT_METHODS_PROVIDER, AffiliatePaymentsMethodsColumnsProvider, UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingAffiliatePaymentsMethodsComponent implements OnInit {
    @Input() set affiliateId(id: number) {
        this._affiliateId$.next(id);
    }

    @Output() requestSended: EventEmitter<number> = new EventEmitter<number>();

    readonly paymentMethod$: Observable<BillingAffiliatePaymentsMethodModel[]> = this.affiliateBillingPaymentMethodsQuery.selectAll();

    readonly notFound$ = this.affiliateBillingPaymentMethodsQuery.notFound$;

    readonly isLoad$ = this.affiliateBillingPaymentMethodsQuery.isLoad$;

    readonly platformInvoiceType: AffiliateInvoiceFrequencyEnum;

    private _affiliateId$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    readonly affiliateId$ = this._affiliateId$.asObservable();

    readonly disableButtonStartTrack$: Observable<StartTrackByType> = this.platformSettings.settings$.pipe(
        pluck('allow_to_enter_an_amount'),
        map((value) => (value ? undefined : StartTrackEnum.Click))
    );

    constructor(
        private readonly unsubscribe: UnsubscribeService,
        private readonly affiliateBillingPaymentsMethodsService: AffiliateBillingPaymentsMethodsService,
        private readonly affiliateBillingPaymentMethodsQuery: AffiliateBillingPaymentMethodsQuery,
        private readonly toastr: ToastrBarService,
        private readonly translate: TranslateService,
        private readonly modal3Service: Modal3Service,
        @Inject(AFFILIATE_PAYMENTS_METHODS_COLUMNS_TOKEN) readonly columns: UiSimpleTableHeaderModel[],
        private readonly platformSettings: PlatformSettingsQuery,
        private readonly profile: ProfileQuery
    ) {
        this.platformInvoiceType = this.platformSettings.settings.invoice_type;
    }

    ngOnInit(): void {
        this.affiliateId$
            .pipe(
                filter((id) => !!id),
                switchMap((id) => this.affiliateBillingPaymentsMethodsService.index(id)),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    get affiliateId(): number {
        return this._affiliateId$.value;
    }

    reload(): void {
        this.affiliateBillingPaymentsMethodsService.reload();
    }

    addPaymentMethod(method?: BillingAffiliatePaymentsMethodModel): void {
        this.getHasAddedPaymentMethod
            .pipe(
                switchMap((hasAddedPaymentMethod) => {
                    return this.modal3Service.editForm(AffiliatePaymentMethodsUpsertComponent, {
                        data: {
                            method,
                            affiliateId: this.affiliateId,
                            // selectedCurrencies$: this.setSelectedCurrencies(method?.currency),
                            hasAddedPaymentMethod: hasAddedPaymentMethod
                        }
                    }).afterClosed$;
                }),
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete, Modal3CloseEventEnum.Create].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                tap(({ type }) => {
                    if (type) {
                        const translate = 'billing2.payment_methods';
                        const messages: BaseObjectModel = {
                            [Modal3CloseEventEnum.Update]: `${translate}.payment_method_edited`,
                            [Modal3CloseEventEnum.Delete]: `${translate}.payment_method_deleted`,
                            [Modal3CloseEventEnum.Create]: `${translate}.payment_method_added`
                        };
                        const event = messages?.[type];

                        console.log(type, messages?.[type]);
                        if (event) {
                            this.toastr.successes(this.translate.instant(event));
                            this.affiliateBillingPaymentsMethodsService.reload();
                        }
                    }
                }),
                take(1)
            )
            .subscribe();
    }

    sendPaymentRequest(method: BillingAffiliatePaymentsMethodModel): void {
        const { allow_to_enter_an_amount: allowToEnterAmount } = this.platformSettings.settings;

        defer(() => (allowToEnterAmount ? this.openRequestPaymentModal(method) : of(null)))
            .pipe(
                exhaustMap((result: RequestPaymentModalOutputModel) =>
                    this.affiliateBillingPaymentsMethodsService.sendPaymentRequest(method.id, {
                        ...result,
                        currency: method.currency,
                        affiliateId: this.affiliateId
                    })
                ),
                catchError((error) => {
                    this.toastr.displayValidationMessages(error?.info.errors);
                    return throwError(error);
                }),
                tap(() => {
                    this.toastr.successes(this.translate.instant('finances_page.details.request_payment_was_sent'));
                }),
                delay(4000),
                take(1)
            )
            .subscribe(({ amount }) => {
                this.affiliateBillingPaymentsMethodsService.reload();
                this.requestSended.emit();
            });
    }

    private openRequestPaymentModal(method: BillingAffiliatePaymentsMethodModel): Observable<RequestPaymentModalOutputModel> {
        // return null;
        // const inputs: Modal2ContentInputsModel = {
        //     minAmount: method.thresholdConverted,
        //     defaultAmount: +method.approved_balance,
        //     currency: method.currency
        // };
        return this.modal3Service
            .info(RequestPaymentModalComponent, {
                data: {
                    minAmount: method.thresholdConverted,
                    defaultAmount: +method.approved_balance,
                    currency: method.currency
                },
                width: '500px',
                title: this.translate.instant('table.column.payment_request')
            })
            .afterClosed$.pipe(
                filter(({ type }) => type === Modal3CloseEventEnum.Apply),
                pluck('data')
            );
    }

    private get getHasAddedPaymentMethod(): Observable<boolean> {
        return this.paymentMethod$.pipe(
            map((methods) => {
                const [first] = methods;
                return !!first?.id && typeof first?.id === 'number';
            }),
            take(1)
        );
    }
}
