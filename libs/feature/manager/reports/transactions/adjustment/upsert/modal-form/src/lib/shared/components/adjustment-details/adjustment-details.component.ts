import { Component, EventEmitter, OnInit, Output, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective, Validators } from '@angular/forms';

import { GoalShortInterface } from '@scaleo/offer/common';

@Component({
    selector: 'app-adjustemnt-details',
    templateUrl: './adjustment-details.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class AdjustmentDetailsComponent implements OnInit {
    @Output() showedAmountField: EventEmitter<boolean> = new EventEmitter<boolean>();

    selectedOfferId = 0;

    public showAmountField: boolean;

    constructor(public parentForm: FormGroupDirective) {}

    ngOnInit(): void {
        const offerId = this.parentForm.form.get('details').get('offer')?.value?.id;
        this.selectedOfferId = offerId || 0;
        const goalType = this.parentForm.form.get('details').get('goal')?.value?.type;
        if (goalType && goalType === 4) {
            this.showAmountField = true;
        }
    }

    selectedOffer(offer: any): void {
        if (offer.newValue) {
            this.selectedOfferId = offer.newValue.id;

            this.parentForm.form.get('details').get('goal').setValue(null);
            this.clearAmountField();
        }
    }

    selectedGoal(goal: any): void {
        if (goal.newValue) {
            const goalObject: GoalShortInterface = goal.newValue;
            this.showAmountField = goalObject.type === 4;
            this.showedAmountField.emit(this.showAmountField);
            if (this.showAmountField) {
                this.showedAmountField.emit(true);
                this.parentForm.form.get('details').get('amount').setValidators(Validators.required);
            } else {
                this.clearAmountField();
            }
        } else if (goal.newValue === 0) {
            this.clearAmountField();
        }
    }

    clearAmountField() {
        this.showAmountField = false;
        this.showedAmountField.emit(this.showAmountField);
        this.parentForm.form.get('details.amount').clearValidators();
        this.parentForm.form.get('details').patchValue({
            amount: null
        });
    }

    onChangeDate(event: any) {
        this.parentForm.form.get('details').patchValue({
            conversions_date: event.rangeFrom
        });
    }
}
