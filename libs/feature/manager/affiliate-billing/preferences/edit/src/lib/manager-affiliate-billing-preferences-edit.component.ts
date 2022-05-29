import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, take, throwError } from 'rxjs';

import {
    AffiliateBilling2PreferencesPayloadType,
    AffiliateBillingPreferencesModel,
    AffiliateBillingPreferencesSchedulePayloadModel,
    BillingPreferencesService
} from '@scaleo/affiliate-billing/preferences/data-access';
import { BaseBillingPreferencesEditComponent } from '@scaleo/affiliate-billing/preferences/edit/common';
import { billingConcatDaysOfMonthUtil } from '@scaleo/affiliate-billing-common';
import { BaseObjectModel, BooleanEnum } from '@scaleo/core/data';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { BillingInvoiceFrequenciesFormControlProvider } from '@scaleo/feature/manager/affiliate-billing/shared/components/invoice-friquencies';
import { AffiliateInvoiceFrequencyEnum } from '@scaleo/invoice/common';
import { PaymentFrequencyIdEnum } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { Modal3CloseEventEnum, Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';
import { objectUtil } from '@scaleo/utils';

const formControls = {
    invoice_frequency: 'invoice_frequency',
    invoice_day_of_the_week: 'invoice_day_of_the_week',
    invoice_first_day_of_the_month: 'invoice_first_day_of_the_month',
    invoice_second_day_of_the_month: 'invoice_second_day_of_the_month'
};

@Component({
    selector: 'scaleo-manager-affiliate-billing-preferences-edit',
    templateUrl: './manager-affiliate-billing-preferences-edit.component.html',
    providers: [BillingInvoiceFrequenciesFormControlProvider(formControls), UnsubscribeService]
})
export class ManagerAffiliateBillingPreferencesEditComponent extends BaseBillingPreferencesEditComponent implements OnInit {
    readonly data: AffiliateBillingPreferencesModel;

    readonly id: number;

    paymentsType: AffiliateInvoiceFrequencyEnum = this.platformSettingsQuery.settings.invoice_type;

    constructor(
        protected fb: FormBuilder,
        private readonly modal3EditFormRef: Modal3EditFormRef,
        protected unsubscribe: UnsubscribeService,
        private preferencesService: BillingPreferencesService,
        private toastr: ToastrBarService,
        private translate: TranslateService,
        protected platformSettingsQuery: PlatformSettingsQuery
    ) {
        super();
        const { id, data } = this.modal3EditFormRef.config.data;
        this.id = id;
        this.data = data;
    }

    ngOnInit(): void {
        this.initForm();
        this.pathDataToForm();
    }

    initForm(): void {
        const formGroup =
            this.paymentsType === AffiliateInvoiceFrequencyEnum.BySchedule
                ? ManagerAffiliateBillingPreferencesEditComponent.formGroupBySchedule
                : ManagerAffiliateBillingPreferencesEditComponent.formGroupByRequest;
        this.form = this.fb.group(formGroup);
    }

    private static get formGroupBySchedule(): { [key: string]: unknown } {
        return {
            [formControls.invoice_frequency]: PaymentFrequencyIdEnum.Monthly,
            [formControls.invoice_first_day_of_the_month]: 1,
            [formControls.invoice_second_day_of_the_month]: 15,
            [formControls.invoice_day_of_the_week]: 'monday',
            generate_invoice_automatically: BooleanEnum.False,
            ...ManagerAffiliateBillingPreferencesEditComponent.formGroupByRequest
        };
    }

    private static get formGroupByRequest(): { [key: string]: unknown } {
        return {
            payment_terms: [null, Validators.required],
            beneficiary_name: [],
            beneficiary_address: [],
            billing_email: [],
            tax_id: [],
            vat: []
        };
    }

    pathDataToForm(): void {
        if (this.paymentsType === AffiliateInvoiceFrequencyEnum.BySchedule) {
            this.pathDataToFormGroupBySchedule();
        }

        if (this.paymentsType === AffiliateInvoiceFrequencyEnum.ByAffiliateRequest) {
            this.pathDataToFormGroupByRequest();
        }
    }

    private pathDataToFormGroupByRequest(): void {
        this.form.patchValue({
            payment_terms: this.data.payment_terms.id,
            beneficiary_name: this.data.beneficiary_name,
            beneficiary_address: this.data.beneficiary_address,
            billing_email: this.data.billing_email,
            tax_id: this.data.tax_id,
            vat: this.data.vat
        });
    }

    private pathDataToFormGroupBySchedule(): void {
        const lastDayOFMonth =
            this.data?.invoice_frequency?.id === PaymentFrequencyIdEnum.BiMonthly ? this.data.invoiceLastDayOFMonth : null;

        this.form.patchValue({
            [formControls.invoice_frequency]: this.data?.invoice_frequency?.id,
            [formControls.invoice_first_day_of_the_month]: this.data.invoiceStartDayOFMonth,
            [formControls.invoice_second_day_of_the_month]: lastDayOFMonth,
            [formControls.invoice_day_of_the_week]: this.data.invoice_day_of_the_week,
            payment_terms: this.data.payment_terms.id,
            beneficiary_name: this.data.beneficiary_name,
            beneficiary_address: this.data.beneficiary_address,
            billing_email: this.data.billing_email,
            tax_id: this.data.tax_id,
            vat: this.data.vat,
            generate_invoice_automatically: this.data.generate_invoice_automatically
        });
    }

    save(): void {
        const { valid, value } = this.form;
        if (valid) {
            let newValue: AffiliateBilling2PreferencesPayloadType = { ...value };

            if (this.paymentsType === AffiliateInvoiceFrequencyEnum.BySchedule) {
                const invoiceFrequency = this.getFormControlValue<PaymentFrequencyIdEnum>('invoice_frequency');
                const firstDay = this.getFormControlValue<number>('invoice_first_day_of_the_month');
                const lastDay = this.getFormControlValue<number>('invoice_second_day_of_the_month');
                newValue = {
                    ...newValue,
                    invoice_days_of_the_month: billingConcatDaysOfMonthUtil(invoiceFrequency, firstDay, lastDay)
                } as AffiliateBillingPreferencesSchedulePayloadModel;
            }

            if (this.paymentsType === AffiliateInvoiceFrequencyEnum.ByAffiliateRequest) {
                objectUtil.removeProperty(newValue, formControls['invoice_day_of_the_week']);
                objectUtil.removeProperty(newValue, 'invoice_days_of_the_month');
                objectUtil.removeProperty(newValue, formControls['invoice_frequency']);
            }

            const payload = {
                ...newValue,
                vat: !newValue?.vat ? 0 : newValue.vat
            };

            this.preferencesService
                .update<AffiliateBilling2PreferencesPayloadType>(payload, this.id)
                .pipe(
                    take(1),
                    catchError((error) => {
                        this.toastr.successes(this.translate.instant('billing2.affiliate.edit.error'));
                        return throwError(error);
                    })
                )
                .subscribe(() => {
                    this.modal3EditFormRef.close(null, Modal3CloseEventEnum.Update);
                    this.toastr.successes(this.translate.instant('billing2.affiliate.edit.updated'));
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    getFormControlValue<T = unknown>(controlName: string): T {
        return this.form.value[(formControls as BaseObjectModel)?.[controlName]];
    }
}
