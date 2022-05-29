import { Component, EventEmitter, HostBinding, Input, Output, SkipSelf, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { PaymentMethodBySupportedCurrencyModel } from '@scaleo/affiliate-billing/payment-methods/upsert/data-access';
import { CurrencyEnum } from '@scaleo/platform/currency/models';
import { TextareaComponent } from '@scaleo/shared/components';

@Component({
    selector: 'app-affiliate-payment-method-info',
    templateUrl: './affiliate-payment-method-info.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class AffiliatePaymentMethodInfoComponent {
    @Input() method: PaymentMethodBySupportedCurrencyModel;

    @Input() currency: CurrencyEnum;

    @Output() changePaymentMethod: EventEmitter<void> = new EventEmitter();

    @HostBinding('class') hostClass = 'payment-method-radio';

    @ViewChild(TextareaComponent) set textareaRef(value: TextareaComponent) {
        if (value) {
            Promise.resolve().then(() => {
                value.elementRef.nativeElement.focus();
            });
        }
    }

    readonly formIdValue$: Observable<number>;

    constructor(private parentForm: FormGroupDirective) {
        this.formIdValue$ = this.getFormIdValue$;
    }

    public get getFormIdValue$(): Observable<number> {
        const idFormControl = this.parentForm.form.get('payment_method_id');
        return idFormControl.valueChanges.pipe(startWith(idFormControl.value as number));
    }

    public setPaymentMethodId(id: number): void {
        if (id !== this.parentForm.form.value['payment_method_id']) {
            this.parentForm.form.patchValue({
                payment_method_id: id
            });
            this.changePaymentMethod.emit();
        }
    }
}
