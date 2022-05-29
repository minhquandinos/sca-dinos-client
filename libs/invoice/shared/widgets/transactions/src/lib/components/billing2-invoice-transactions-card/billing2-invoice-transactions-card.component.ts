import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, share, startWith } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { Billing2InvoiceAdjustmentAdvanceModel, InvoiceTransactionModel, InvoiceUpdateAmountRequestModel } from '@scaleo/invoice/common';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { InvoiceStatusNameEnum } from '@scaleo/platform/list/access-data';
import { NavigateRootPipe } from '@scaleo/shared/components';

@Component({
    selector: 'app-billing2-invoice-transactions-card',
    templateUrl: './billing2-invoice-transactions-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UnsubscribeService, NavigateRootPipe]
})
export class Billing2InvoiceTransactionsCardComponent implements OnChanges {
    @Input() data: InvoiceTransactionModel;

    @Input() status: InvoiceStatusNameEnum;

    @Input() currency: CurrencyEnum;

    @Input()
    adjustmentsAdvanceAccess: boolean;

    @Output() updateAmount: EventEmitter<InvoiceUpdateAmountRequestModel> = new EventEmitter<InvoiceUpdateAmountRequestModel>();

    form: FormGroup;

    advanceBtnShow$: Observable<boolean>;

    showReferralAmount: boolean;

    isDraftStatus: boolean;

    constructor(private fb: FormBuilder) {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        const { data, status } = changes;

        if (status?.currentValue) {
            this.isDraftStatus = status?.currentValue === InvoiceStatusNameEnum.Draft;
        }

        if (data?.currentValue) {
            const { adjustment, advance, referral_amount } = data?.currentValue || {};
            this.showReferralAmount = !!+referral_amount;

            if (adjustment?.name && adjustment?.amount) {
                this.form.get('adjustment').patchValue(
                    {
                        name: adjustment?.name || null,
                        amount: adjustment?.amount || null
                    },
                    { emitEvent: false, onlySelf: false }
                );
            }

            if (+advance.amount && this.isDraftStatus) {
                this.form.addControl('advance', this.entityField(advance));
                this.form.get('advance').get('name').disable();
            }
        }
    }

    addAdvanceControl(): void {
        if (!this.form.get('advance')) {
            this.form.addControl(
                'advance',
                this.fb.group({
                    name: [],
                    amount: [0, Validators.required]
                })
            );
            this.form.get('advance').get('name').disable();
        }
    }

    save() {
        const { adjustment, advance } = this.form.value;
        const payload: InvoiceUpdateAmountRequestModel = {
            adjustment_title: adjustment?.name || '',
            adjustment_amount: adjustment?.amount || 0,
            advance_plus_amount: advance?.amount || 0
        };

        this.updateAmount.emit(payload);
    }

    deleteAdvance() {
        if (this.form.get('advance')) {
            this.form.removeControl('advance');
            this.save();
        }
    }

    private entityField(field?: Billing2InvoiceAdjustmentAdvanceModel): AbstractControl {
        return this.fb.group({
            name: [field?.name || ''],
            amount: [field?.amount || '']
        });
    }

    private initForm(): void {
        this.form = this.fb.group({
            adjustment: this.entityField({ name: '', amount: '0' })
        });
        this.advanceBtnShow$ = this.advanceBtnShow();
    }

    private advanceBtnShow(): Observable<boolean> {
        return this.form.valueChanges.pipe(
            startWith(this.form.value as unknown),
            map((value) => !value?.advance),
            share()
        );
    }
}
