import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Billing2InvoiceAdditionalTransactionService {
    private _controlChanged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    controlChanged$ = this._controlChanged$.asObservable();

    controlValueChanges(control: FormGroup): void {
        this._controlChanged$.next(true);
        control.get('name').setValidators([Validators.required]);
        control.get('amount').setValidators([Validators.required]);
        control.get('name').updateValueAndValidity({ onlySelf: false, emitEvent: false });
        control.get('amount').updateValueAndValidity({ onlySelf: false, emitEvent: false });
    }

    set controlChanged(value: boolean) {
        this._controlChanged$.next(value);
    }

    get controlChanged(): boolean {
        return this._controlChanged$.value;
    }
}
