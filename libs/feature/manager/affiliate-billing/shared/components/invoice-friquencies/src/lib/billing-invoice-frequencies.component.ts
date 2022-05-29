import { Component, Inject, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';

import { BaseObjectModel } from '@scaleo/core/data';
import { PaymentFrequencyIdEnum, PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { SelectComponent } from '@scaleo/shared/components/select';

import { BillingInvoicesFrequenciesFormControlsModel } from './models/billing-invoices-frequencies-form-control.model';
import { BILLING_INVOICE_FREQUENCIES_FORM_CONTROL_TOKEN } from './tokens/billing-invoice-frequencies-form-control.token';

@Component({
    selector: 'scaleo-mng-billing-invoice-frequencies',
    templateUrl: './billing-invoice-frequencies.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class BillingInvoiceFrequenciesComponent implements OnInit {
    formNameForInvoiceFrequencyItemSelect$: Observable<string>;

    @ViewChild('invoiceFrequencyItemSelect') private readonly invoiceFrequencyItemSelect: SelectComponent;

    invoiceFrequencyItems$: Observable<PlatformListsFormatInterface[]>;

    readonly paymentFrequencyIdEnum = PaymentFrequencyIdEnum;

    readonly getDaysOfMonth = BillingInvoiceFrequenciesComponent.daysOfMonth;

    readonly getHalfOfMonth = BillingInvoiceFrequenciesComponent.daysOfMonth.slice(14, 28);

    readonly getDaysOfWeek = BillingInvoiceFrequenciesComponent.daysOfWeek;

    invoiceFrequencyControl: string;

    firstDayOfTheMonthControl: string;

    dayOfTheWeekControl: string;

    secondDayOfTheMonthControl: string;

    constructor(
        public parentForm: FormGroupDirective,
        @Inject(BILLING_INVOICE_FREQUENCIES_FORM_CONTROL_TOKEN) private formControl: BillingInvoicesFrequenciesFormControlsModel
    ) {
        this.setControls();
    }

    ngOnInit(): void {
        this.formNameForInvoiceFrequencyItemSelect$ = this.changedInvoiceFrequency.pipe(
            debounceTime(0),
            map((value) => (value === PaymentFrequencyIdEnum.Weekly ? this.dayOfTheWeekControl : this.firstDayOfTheMonthControl)),
            tap((formControlName) => {
                this.invoiceFrequencyItemSelect?.changeFormControl(formControlName);
            })
        );

        this.invoiceFrequencyItems$ = this.changedInvoiceFrequency.pipe(map((value) => this.setInvoiceFrequencyItems2(value)));
    }

    changeInvoiceFrequencyValue(): void {
        if (this.parentForm.form.value.invoice_frequency === PaymentFrequencyIdEnum.Weekly) {
            this.parentForm.form.patchValue({
                [this.dayOfTheWeekControl]: 'monday'
            });
        } else {
            this.parentForm.form.patchValue({
                [this.firstDayOfTheMonthControl]: 1,
                [this.secondDayOfTheMonthControl]: 15
            });
            this.parentForm.form.get(this.firstDayOfTheMonthControl).updateValueAndValidity();
        }
    }

    private get changedInvoiceFrequency(): Observable<number> {
        return this.parentForm.form
            .get('invoice_frequency')
            .valueChanges.pipe(startWith(this.parentForm.form.get(this.invoiceFrequencyControl).value));
    }

    get invoiceFrequency(): PaymentFrequencyIdEnum {
        return this.parentForm.form.get(this.invoiceFrequencyControl).value;
    }

    // generate 1 - 28
    private static get daysOfMonth(): PlatformListsFormatInterface[] {
        return [...Array(29).keys()]
            .filter((int) => int)
            .map((int: number) => ({
                id: int,
                title: String(int)
            }));
    }

    private static get daysOfWeek(): PlatformListsFormatInterface[] {
        const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        return daysOfWeek.map((day: string) => ({
            id: day,
            title: day
        }));
    }

    private setInvoiceFrequencyItems2(value: PaymentFrequencyIdEnum): PlatformListsFormatInterface[] {
        const items: BaseObjectModel = {
            [PaymentFrequencyIdEnum.Weekly]: this.getDaysOfWeek,
            [PaymentFrequencyIdEnum.BiMonthly]: this.getDaysOfMonth.slice(0, 14)
        };
        return items?.[value] || this.getDaysOfMonth;
    }

    private setControls(): void {
        const { invoice_frequency, invoice_day_of_the_week, invoice_first_day_of_the_month, invoice_second_day_of_the_month } =
            this.formControl;

        this.invoiceFrequencyControl = invoice_frequency;
        this.firstDayOfTheMonthControl = invoice_first_day_of_the_month;
        this.dayOfTheWeekControl = invoice_day_of_the_week;
        this.secondDayOfTheMonthControl = invoice_second_day_of_the_month;
    }
}
