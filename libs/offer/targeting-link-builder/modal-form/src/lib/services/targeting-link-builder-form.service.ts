import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TargetingLinkBuilderFormService {
    private _form$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);

    get form(): FormGroup {
        return this._form$.value;
    }

    setForm(form: FormGroup) {
        this._form$.next(form);
    }
}
