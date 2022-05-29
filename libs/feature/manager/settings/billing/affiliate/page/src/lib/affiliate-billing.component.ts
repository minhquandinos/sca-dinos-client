import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, take } from 'rxjs';
import { filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';

import { BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import {
    BILLING_INVOICE_FREQUENCIES_FORM_CONTROL_TOKEN,
    BillingInvoiceFrequenciesFormControlProvider,
    BillingInvoicesFrequenciesFormControlsModel
} from '@scaleo/feature/manager/affiliate-billing/shared/components/invoice-friquencies';
import {
    SETTINGS_AFFILIATE_BILLING_PROVIDER,
    SettingsAffiliateBillingService
} from '@scaleo/feature/manager/settings/billing/affiliate/data-access';
import { SettingsCardService } from '@scaleo/feature/manager/settings/shared';
import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';
import {
    InvoicesPaymentsTermsIdEnum,
    InvoiceStatusNameEnum,
    PaymentFrequencyIdEnum,
    PlatformListsFormatInterface,
    PlatformListsService
} from '@scaleo/platform/list/access-data';
import { NewPlatformSettingsService, PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { PLATFORM_PLAN_FEATURE } from '@scaleo/platform-permission-plan-common';
import { PlanFeatureService } from '@scaleo/platform-permission-plan-service';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

const formControls = {
    invoice_frequency: 'invoice_frequency',
    invoice_day_of_the_week: 'invoice_day_of_the_week',
    invoice_first_day_of_the_month: 'invoice_first_day_of_the_month',
    invoice_second_day_of_the_month: 'invoice_second_day_of_the_month'
};

@Component({
    selector: 'scaleo-mng-affiliate-billing',
    templateUrl: './affiliate-billing.component.html',
    providers: [SETTINGS_AFFILIATE_BILLING_PROVIDER, UnsubscribeService, BillingInvoiceFrequenciesFormControlProvider(formControls)]
})
export class AffiliateBillingComponent implements OnInit {
    form: FormGroup;

    readonly paymentsTypes$ = this.getPaymentsTypes$;

    readonly affiliateInvoiceFrequencyEnum = AffiliateInvoiceFrequencyEnum;

    formNameForInvoiceFrequencyItemSelect: string;

    readonly allowGenerateInvoiceAutomatically = this.getAllowGenerateInvoiceAutomatically;

    readonly showIncludeReferralBalanceSwitch = this.getShowIncludeReferralBalanceSwitch;

    isLoadBillingSettings$: Observable<boolean>;

    readonly excludeInvoicesPaidStatuses = [InvoiceStatusNameEnum.Paid];

    constructor(
        private affiliateBillingService: SettingsAffiliateBillingService,
        private formBuilder: FormBuilder,
        private platformListsService: PlatformListsService,
        private translate: TranslateService,
        private billingService: SettingsCardService,
        private toastr: ToastrBarService,
        private unsubscribe: UnsubscribeService,
        private planPermissionsService: PlanFeatureService,
        private platformSettingsQuery: PlatformSettingsQuery,
        private platformSettings: NewPlatformSettingsService,
        @Inject(BILLING_INVOICE_FREQUENCIES_FORM_CONTROL_TOKEN)
        private formControl: BillingInvoicesFrequenciesFormControlsModel
    ) {}

    ngOnInit(): void {
        this.init();
    }

    private init(): void {
        this.initForm();
        this.loadBillingSetting();
        this.checkSave();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            invoice_type: AffiliateInvoiceFrequencyEnum.BySchedule,
            [this.formControl.invoice_frequency]: PaymentFrequencyIdEnum.Monthly,
            [this.formControl.invoice_first_day_of_the_month]: 1,
            [this.formControl.invoice_second_day_of_the_month]: 15,
            [this.formControl.invoice_day_of_the_week]: 'monday',
            show_the_balance_of_pending_conversions: BooleanEnum.True,
            information_for_affiliates: '',
            allow_to_enter_an_amount: BooleanEnum.False,
            allow_an_attachment: BooleanEnum.False,
            generate_invoice_automatically: BooleanEnum.False,
            default_payment_terms: InvoicesPaymentsTermsIdEnum.None,
            include_referral_balance: BooleanEnum.False,
            bill_to_name: '',
            bill_to_address: '',
            bill_to_email: ['', Validators.email],
            bill_to_tax_id: '',
            invoice_footer: '',
            default_invoice_status: 1
        });
    }

    private loadBillingSetting(): void {
        this.isLoadBillingSettings$ = this.affiliateBillingService.view().pipe(
            tap((res) => {
                this.form.patchValue({ ...res });
                this.billingService.changeShowSaveButton(true);
            }),
            map(() => true),
            take(1)
        );
    }

    public checkSave(): void {
        this.billingService.saveSubject
            .pipe(
                switchMap(() => {
                    if (this.form.valid) {
                        return this.affiliateBillingService.update(this.form.value);
                    }
                    this.form.markAllAsTouched();
                    return of(null);
                }),
                filter((res) => !!res),
                tap(() => {
                    this.toastr.successes(this.translate.instant('billing2.settings.affiliate.save_notification'));
                }),
                switchMap(() => this.platformSettings.getPlatformSettings()),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    public allowToEnterAmountChanged(allow: boolean): void {
        if (!allow && this.form.value.allow_an_attachment) {
            this.form.patchValue({
                allow_an_attachment: BooleanEnum.False
            });
        }
    }

    private get getAllowGenerateInvoiceAutomatically(): boolean {
        return this.planPermissionsService.hasFeature(PLATFORM_PLAN_FEATURE.generateInvoiceAutomatically);
    }

    private get getShowIncludeReferralBalanceSwitch(): boolean {
        return this.allowGenerateInvoiceAutomatically && this.platformSettingsQuery.settings.affReferralProgram;
    }

    private get getPaymentsTypes$(): Observable<PlatformListsFormatInterface[]> {
        return this.platformListsService.platformListsNew('payments_types').pipe(
            pluck('payments_types'),
            map((paymentsTypes: PlatformListsFormatInterface[]) =>
                paymentsTypes.map((item: PlatformListsFormatInterface) => {
                    const title = item.title.toLowerCase().replace(/ /g, '_');
                    return {
                        ...item,
                        title
                    };
                })
            )
        );
    }
}
